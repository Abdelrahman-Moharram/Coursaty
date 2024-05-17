from rest_framework import response, status
from .models import Banner, BannerImage
from courses.models import Industry, Course, Category, SubCategory
from courses.serializers import IndustriesSerial, IncludedCategoryBaseSerial, IncludedSubCategoryBaseSerial, IncludedIndustrySerial, CourseListSerial, IndustrySerial
from .serializers import BannerImageSerial
from rest_framework.permissions import AllowAny
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


@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllIndustries(request):
    industrySerial  = IndustriesSerial(data=
        Industry.objects.all(), 
        many=True
    )
    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industries': industrySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetAllIndustriesAsSelectList(request):
    industrySerial  = IncludedIndustrySerial(
        data=Industry.objects.values('id', 'name'), 
        many=True
    )

    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industries': industrySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetCategoriesFromIndustryAsSelectList(request, industry_id):
    categorySerial = IncludedCategoryBaseSerial(data=
        Category.objects.filter(industry_id=industry_id).values('id', 'name'), 
        many=True
    )
    if categorySerial.is_valid():
        pass
    return response.Response(data={
       'categories': categorySerial.data,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetSubCategoriesFromCategoryAsSelectList(request, category_id):
    subCategorySerial  = IncludedSubCategoryBaseSerial(
        data=SubCategory.objects.filter(category_id=category_id).values('id', 'name'), 
        many=True
    )
    if not subCategorySerial.is_valid():
        pass
    return response.Response(data={
       'subcategories': subCategorySerial.data,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def GetIndustryById(request, id):

    industrySerial  = IndustrySerial(
        data=Industry.objects.select_related().filter(id=id), 
        many=True, 
        allow_null=True
    )
    if not industrySerial.is_valid():
        pass
    return response.Response(data={
       'industry': industrySerial.data[0],
    }, status=status.HTTP_200_OK)