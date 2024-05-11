from django.shortcuts import redirect, HttpResponse
from rest_framework import response, status
from .models import Course, Section
from .serializers import CourseListSerial, CourseDetailsSerial, SectionsSerial
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsOwnCourse
from .Payments import paypal_place_order



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
    return response.Response(data={
        "course":courseSerial.data[0]
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
    print(request.user)
    Sections = Section.objects.filter(course_id=id)
    courseSerial = SectionsSerial(data=Sections, many=True)
    if courseSerial.is_valid():
        pass
    return response.Response(data={
        "sections":courseSerial.data
    }, status=status.HTTP_200_OK)


def create_payment(request):
    payment = paypal_place_order()
    if payment.create():
        for link in payment.links:
            if link.method == "REDIRECT":
                redirect_url = link.href
                return redirect(redirect_url)
    else:
        return response.Response("Error: " + payment.error, status=status.HTTP_400_BAD_REQUEST)