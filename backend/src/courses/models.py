from django.db import models
from django.conf import settings
import uuid

def imagesave(instance,filename):
    extension = filename.split(".")[-1]
    return "users/%s/%s.%s"%("images", instance.user.username, extension)


class Category(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.TextField()
    instructor          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category            = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory         = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    image               = models.ImageField(default="courses/default.webp",upload_to=imagesave, null=True)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name


class Section(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    course              = models.ForeignKey(Course, on_delete=models.CASCADE)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name


