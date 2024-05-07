from rest_framework import serializers
from .models import Industry, Course

class IndustriesSerial(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'image', 'name', 'description', ]

class CourseListSerial(serializers.ModelSerializer):
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
        ]