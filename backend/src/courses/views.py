from django.shortcuts import render
from rest_framework import response, status
from .models import Course
from .serializers import CourseListSerial, CourseDetailsSerial
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes


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
    course = Course.objects.filter(id=id)
    courseSerial = CourseDetailsSerial(data=course, many=True, allow_null=True)
    
    if courseSerial.is_valid():
        pass
    return response.Response(data={
        "course":courseSerial.data
    }, status=status.HTTP_200_OK)
    