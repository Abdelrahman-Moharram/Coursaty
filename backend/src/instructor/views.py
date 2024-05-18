from django.shortcuts import render
from courses.models import Course, user_courses, Section
from rest_framework import response, status
from django.db.models.functions import ExtractYear
from django.db import models
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from .permissions import IsCourseInstructorOrAdmin
from courses.serializers import CourseListSerial, SectionsSerial

def clean_purchasing_history(purchasing_histroy, price):
    cleaned_purchasing_history = {
        'years':[],
        'numbers': [],
        'total': 0,
        'total_earned': 0
    }
    for item in purchasing_histroy:
        cleaned_purchasing_history['years'].append(item['year'])
        cleaned_purchasing_history['numbers'].append(item['n'])
        cleaned_purchasing_history['total'] += item['n']
    cleaned_purchasing_history['total_earned'] = cleaned_purchasing_history['total'] * price 
    return cleaned_purchasing_history



@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsCourseInstructorOrAdmin,))
def course_info(request, course_id):
    course = Course.objects.filter(id=course_id).first()
    if not course:
        return response.Response({'message': 'this course not found'},status=status.HTTP_404_NOT_FOUND)
    
    purchasing_histroy = user_courses.objects.filter(course_id=course_id).annotate(
            year=ExtractYear('added_at'),
            ).values(
                'year'
            ).annotate(
                n=models.Count('pk')
        ).order_by('year')
    
    course_serial = CourseListSerial(data=[course], many=True)
    if course_serial.is_valid():
        pass

    return response.Response(
        data={
            'purchasing_histroy': clean_purchasing_history(purchasing_histroy, course.price),
            'course': course_serial.data[0]
        }, 
        status=status.HTTP_200_OK
    )


@renderer_classes((JSONRenderer))
@api_view(['GET'])
@permission_classes((IsCourseInstructorOrAdmin,))
def Course_Sections(request, course_id):
    sections = Section.objects.filter(course_id=course_id)
    if not sections:
        return response.Response(
            data={
                'message': 'This Page is not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    sections = SectionsSerial(data=sections, many=True)
    if sections.is_valid():
        pass
    return response.Response(
        data={
            'sections': sections.data
        },
        status=status.HTTP_200_OK
    )

