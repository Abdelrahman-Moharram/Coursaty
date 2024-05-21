from django.shortcuts import redirect
from rest_framework import response, status
from .models import Course, Section, Content, user_courses
from .serializers import CourseListSerial, CourseDetailsSerial, DetailedIncludedContentSerial, SectionsSerial, BaseCourseListSerial, IndustriesSerial
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from .permissions import IsOwnCourse
from .Payments import apply_stripe_payment
from rest_framework.renderers import JSONRenderer
from django.conf import settings
from django.db.models import Q
from .forms import course_form


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



@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_course(request):
    form = course_form(request.POST, request.FILES,)
    if form.is_valid():
        form = form.save(commit=False)
        form.instructor = request.user
        form.save()
        return response.Response({'message':"your course added successfully", 'id':form.id}, status=status.HTTP_201_CREATED)
    
    return response.Response({
        'errors': form.errors.as_data()
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((AllowAny,))
def CourseDetails(request, id):
    course = Course.objects.get(id=id)
    courseSerial = CourseDetailsSerial(data=[course], many=True, allow_null=True)
    
    if courseSerial.is_valid():
        pass
    isOwnCourse = 0
    if request.user.is_authenticated:
        isOwnCourse = len(user_courses.objects.filter(course_id=id, user=request.user)) > 0
    
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
def CourseSections(request, id):
    Sections = Section.objects.filter(course_id=id)
    courseSectionsSerial = SectionsSerial(data=Sections, many=True)
    if courseSectionsSerial.is_valid():
        pass
    return response.Response(data={
        "sections":courseSectionsSerial.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated, IsOwnCourse))
def SectionContent(request, id, content_id):
    contents = Content.objects.filter(id=content_id)
    section_content = DetailedIncludedContentSerial(data=contents, many=True)
    if section_content.is_valid():
        pass
    return response.Response(data={
        "content":section_content.data[0]
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UserCoursesList(request):
    courses = user_courses.objects.values('course').filter(user=request.user).all()
    coursesSerial = BaseCourseListSerial(data=Course.objects.filter(id__in=courses), many=True)
    if coursesSerial.is_valid():
        pass
    return response.Response(data={
        "courses":coursesSerial.data
    }, status=status.HTTP_200_OK)


@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def purchase_course(request, id):
    if len(user_courses.objects.filter(user=request.user, course_id=id)) > 0:
        response.Response({'message': 'you already have this course'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect(settings.DOMAIN + 'courses/'+id)
    course = Course.objects.filter(id=id).first()
    if not course:
        response.Response({'message': 'Course Not Found'}, status=status.HTTP_404_NOT_FOUND)
        return redirect(settings.DOMAIN + 'courses/'+id)
    
    if course.price:
        checkout_session, success = apply_stripe_payment(id, price=course.price, name=course.name)
        if not success:
            return response.Response(
                {
                    'message': 'something went wrong',
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        user_courses.objects.create(course=course, user=request.user, )
        return redirect(checkout_session.url)
    user_courses.objects.create(course=course, user=request.user, )
    return redirect(settings.DOMAIN + 'courses/{}/learn'.format(id),)
    
    
    


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

