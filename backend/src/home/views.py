from rest_framework import response, status
from .models import Banner, BannerImage
from courses.models import Industry, Course
from courses.serializers import IndustriesSerial, CourseListSerial
from .serializers import BannerImageSerial
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes((AllowAny,))
def index(request):
    bannerSerial    = BannerImageSerial(data=BannerImage.objects.all(), many=True)
    
    industrySerial  = IndustriesSerial(data=
        Industry.objects.all(), 
        many=True
    )

    lowCoursesSerial = CourseListSerial(
        data= Course.objects.order_by('price')[:10],
        many= True
    )
    topCoursesSerial = CourseListSerial(
        data= Course.objects.all()[:10],
        many= True
    )
    if not bannerSerial.is_valid():
        pass
    if not industrySerial.is_valid():
        pass
    if lowCoursesSerial.is_valid():
        pass
    if topCoursesSerial.is_valid():
        pass
    return response.Response(data={
        'images': bannerSerial.data,
        'industries': industrySerial.data,
        'lowPricesCourses': lowCoursesSerial.data,
        'topCourses':topCoursesSerial.data
    }, status=status.HTTP_200_OK)