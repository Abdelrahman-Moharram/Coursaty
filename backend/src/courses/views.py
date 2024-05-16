from django.shortcuts import redirect
from rest_framework import response, status
from .models import Course, Section, Industry
from .serializers import CourseListSerial, CourseDetailsSerial, SectionsSerial, BaseCourseListSerial, IndustriesSerial
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from .permissions import IsOwnCourse
from .Payments import apply_stripe_payment
from rest_framework.renderers import JSONRenderer
from django.conf import settings
from django.db.models import Q

def to_int(val, default):
    if val:
        try:
            return int(val)
        except:
            pass
    return default
        

@api_view(['GET'])
@permission_classes((AllowAny,))
def index(request):
    page = to_int(request.GET.get('page'), 0)
    size = to_int(request.GET.get('size'), 10)
    
    courses_serial = CourseListSerial(
        data=Course.objects.all()[page*size : (page+1) * size], 
        many=True
    )

    if courses_serial.is_valid():
        pass
    return response.Response({
        "page" : page,
        "size": size,
        "total":int(Course.objects.count()/size) or 1,
        "courses": courses_serial.data,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def CourseDetails(request, id):
    course = Course.objects.get(id=id)
    courseSerial = CourseDetailsSerial(data=[course], many=True, allow_null=True)
    
    if courseSerial.is_valid():
        pass
    if request.user:
        isOwnCourse = len(request.user.courses.filter(id=id)) > 0
    
    return response.Response(data={
        "course":courseSerial.data[0],
        "isOwnCourse": isOwnCourse
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def Coursename(request, id):
    course = Course.objects.get(id=id).name
    
    return response.Response(data={
        "name":course
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsOwnCourse))
def CourseLearn(request, id):
    Sections = Section.objects.filter(course_id=id)
    courseSectionsSerial = SectionsSerial(data=Sections, many=True)
    if courseSectionsSerial.is_valid():
        pass
    return response.Response(data={
        "sections":courseSectionsSerial.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UserCoursesList(request):
    coursesSerial = BaseCourseListSerial(data=request.user.courses.all(), many=True)
    if coursesSerial.is_valid():
        pass
    return response.Response(data={
        "courses":coursesSerial.data
    }, status=status.HTTP_200_OK)


@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def Stripe_payment(request, id):
    if len(request.user.courses.filter(id=id)) > 0:
        response.Response({'message': 'you already have this course'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect(settings.DOMAIN + 'courses/'+id)
    course = Course.objects.filter(id=id).first()
    if not course:
        response.Response({'message': 'Course Not Found'}, status=status.HTTP_404_NOT_FOUND)
        return redirect(settings.DOMAIN + 'courses/'+id)
    checkout_session, success = apply_stripe_payment(id, price=course.price, name=course.name)
    if success:
        request.user.courses.add(course)
        return redirect(checkout_session.url)
    return response.Response(
        {
            'message': 'something went wrong',
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsOwnCourse))
def GetCoursesFromDep(request, id):
    courses = Course.objects.filter(
        Q(category=id) | Q(subcategory=id) | Q(industry=id)
    )
    courseSectionsSerial = BaseCourseListSerial(data=courses, many=True)
    if courseSectionsSerial.is_valid():
        pass
    return response.Response(data={
        "courses":courseSectionsSerial.data
    }, status=status.HTTP_200_OK)

