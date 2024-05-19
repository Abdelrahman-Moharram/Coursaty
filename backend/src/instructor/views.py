from django.shortcuts import render
from courses.models import Course, user_courses, Section, Content
from rest_framework import response, status
from django.db.models.functions import ExtractYear
from django.db import models
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from .permissions import IsCourseInstructorOrAdmin, IsContentOwnerOrAdmin
from courses.serializers import CourseListSerial, SectionsSerial
import json
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

@renderer_classes((JSONRenderer))
@api_view(['POST'])
@permission_classes((IsCourseInstructorOrAdmin,))
def add_content(request, course_id, section_id):
    body = json.loads(request.body)
    print(body)
    try:
        if not body['name']:
            return response.Response(
                data={'message': "content name can't be empty"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        content = Content.objects.create(section_id=section_id, name=body['name'])
        content.save()

        return response.Response(
            data={
                'message': f'content {content.name} added successfully!'
            }, 
            status=status.HTTP_201_CREATED)
        pass
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )


@renderer_classes((JSONRenderer))
@api_view(['POST'])
@permission_classes((IsContentOwnerOrAdmin,))
def edit_content(request, content_id):
    try:
        content = Content.objects.filter(id=content_id).first()
        if not content:
            return response.Response(
                data={'message': 'this content not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        if request.POST['name']:
            content.name = request.POST['name']
        if 'file' in request.FILES:
            content.file = request.FILES['file']
        if 'video' in request.FILES:
            content.video = request.FILES['video']
        content.save()
        return response.Response(
            data={
                'message': f'content {content.name} updated successfully!'
            }, 
            status=status.HTTP_200_OK
        )
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        




@renderer_classes((JSONRenderer))
@api_view(['DELETE'])
@permission_classes((IsContentOwnerOrAdmin,))
def delete_content(request, content_id):
    try:
        Content.objects.filter(id=content_id).delete()
        return response.Response(data={
            'message': 'item deleted successfully!'
        }, status=status.HTTP_204_NO_CONTENT)
    except:
        return response.Response(
            data={'message': 'something went wrong contact the admin'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
        