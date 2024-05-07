from django.contrib import admin
from .models import Category, Course, Section, SubCategory, Industry
# Register your models here.

   
admin.site.register(Industry)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Course)
admin.site.register(Section)