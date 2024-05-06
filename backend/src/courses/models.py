from django.db import models
from django.contrib.auth.models import User
import uuid



class Category(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.TextField()
    instructor          = models.ForeignKey(User, on_delete=models.CASCADE)
    category            = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory         = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    image               = models.FileField(upload_to=None, max_length=100)
    def __str__(self) -> str:
        return self.name


class Section(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    course              = models.ForeignKey(Course, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.name


