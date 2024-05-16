from django.urls import path
from .views import (
    index,
    GetAllIndustries,
    GetIndustryById
    )

app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
        # industries
    
    path("industries/", GetAllIndustries, name="industries"),
    path("industries/<str:id>/", GetIndustryById, name="industry"),
    
]
