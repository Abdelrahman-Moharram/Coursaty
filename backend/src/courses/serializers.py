from rest_framework import serializers
from .models import Industry, Course, Category, Section, Content
from accounts.serializers import IncludedUserSerial

class IndustriesSerial(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'image', 'name', 'description', ]


class IncludedCategorySerial(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields=['id', 'name']

class IncludedContentSerial(serializers.ModelSerializer):
    class Meta:
        model= Content
        depth=1
        fields=['id', 'name']

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
    category        = IncludedCategorySerial()
    section_set     = IncludedSectionSerial(many=True)
    class Meta:
        model = Course
        depth=1
        fields = [
            'id',
            'name',
            'description',
            'category',
            'image',
            'created_at',
            'price',
            'instructor',
            'section_set'
        ]