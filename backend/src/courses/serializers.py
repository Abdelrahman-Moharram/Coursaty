from rest_framework import serializers
from .models import Industry, Course, Category
from accounts.serializers import IncludedUserSerial

class IndustriesSerial(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'image', 'name', 'description', ]


class IncludedCategorySerial(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields=['id', 'name']

class CourseListSerial(serializers.ModelSerializer):
    instructor        = IncludedUserSerial()
    category    = IncludedCategorySerial()
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