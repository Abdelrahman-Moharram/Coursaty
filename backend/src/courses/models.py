from django.db import models
from django.conf import settings
import uuid

def imagesave(instance,filename):
    extension = filename.split(".")[-1]
    return "users/%s.%s"%(instance.id, extension)


class Industry(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.CharField(max_length=255, null=True, blank=True)
    image               = models.ImageField(default="coursatty-favicon-black.png",upload_to=imagesave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    def __str__(self) -> str:
        return self.name

class Category(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.CharField(max_length=255, null=True, blank=True)
    image               = models.ImageField(default="coursatty-favicon-black.png",upload_to=imagesave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    industry            = models.ForeignKey(Industry, on_delete=models.PROTECT)
    def __str__(self) -> str:
        return self.name


class SubCategory(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    is_deleted          = models.BooleanField(default=False)
    created_by          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    category            = models.ForeignKey(Category, on_delete=models.PROTECT)
    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    description         = models.TextField()
    instructor          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    category            = models.ForeignKey(Category, on_delete=models.PROTECT)
    subcategory         = models.ForeignKey(SubCategory, on_delete=models.PROTECT)
    image               = models.ImageField(default="coursatty-high-resolution-logo-white.png",upload_to=imagesave, null=True)
    is_deleted          = models.BooleanField(default=False)
    created_at          = models.DateTimeField(auto_now=True, auto_now_add=False)
    price               = models.DecimalField(max_digits=8, decimal_places=2)
    def __str__(self) -> str:
        return self.name


class Section(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    course              = models.ForeignKey(Course, on_delete=models.PROTECT)
    is_deleted          = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name

