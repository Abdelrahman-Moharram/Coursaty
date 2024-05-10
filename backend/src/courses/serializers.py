from rest_framework import serializers
from .models import Industry, Course, Category, Section, Content, SubCategory, Industry
from accounts.serializers import IncludedUserSerial

class IndustriesSerial(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'image', 'name', 'description', ]


class IncludedIndustrySerial(serializers.ModelSerializer):
    class Meta:
        model= Industry
        fields=['id', 'name']


class IncludedCategorySerial(serializers.ModelSerializer):
    industry = IncludedIndustrySerial(many=False)
    class Meta:
        model= Category
        fields=['id', 'name', 'industry']


class IncludedSubCategorySerial(serializers.ModelSerializer):
    category = IncludedCategorySerial(many=False)
    class Meta:
        model= SubCategory
        fields=['id', 'name', 'category']

class IncludedContentSerial(serializers.ModelSerializer):
    class Meta:
        model= Content
        depth=1
        fields=['id', 'name']
class DetailedIncludedContentSerial(serializers.ModelSerializer):
    class Meta:
        model= Content
        depth=1
        fields=['id', 'name', 'file', 'video']

class IncludedSectionSerial(serializers.ModelSerializer):
    content_set = IncludedContentSerial(many=True)
    class Meta:
        model= Section
        depth=1
        fields=['id', 'name', 'content_set']

class CourseListSerial(serializers.ModelSerializer):
    instructor      = IncludedUserSerial()
    category        = IncludedCategorySerial()

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'description',
            'category',
            'image',
            'created_at',
            'price',
            'instructor'
        ]

class CourseDetailsSerial(serializers.ModelSerializer):
    instructor      = IncludedUserSerial()
    subcategory     = IncludedSubCategorySerial()
    section_set     = IncludedSectionSerial(many=True)
    class Meta:
        model = Course
        depth=1
        fields = [
            'id',
            'name',
            'description',
            'subcategory',
            'image',
            'created_at',
            'price',
            'instructor',
            'section_set'
        ]

class SectionsSerial(serializers.ModelSerializer):
    content_set = DetailedIncludedContentSerial(many=True)
    class Meta:
        model = Section
        fields = [
            'id',
            'name',
            'content_set'
        ]
