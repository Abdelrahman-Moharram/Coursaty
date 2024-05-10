# Generated by Django 5.0.4 on 2024-05-09 16:47

import courses.models
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_alter_category_image_alter_course_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.ImageField(default='coursatty-favicon-black.png', null=True, upload_to=courses.models.categorysave),
        ),
        migrations.AlterField(
            model_name='course',
            name='image',
            field=models.ImageField(default='coursatty-high-resolution-logo-white.png', null=True, upload_to=courses.models.coursesave),
        ),
        migrations.AlterField(
            model_name='industry',
            name='image',
            field=models.ImageField(default='coursatty-favicon-black.png', null=True, upload_to=courses.models.industrysave),
        ),
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('is_deleted', models.BooleanField(default=False)),
                ('video', models.FileField(blank=True, null=True, upload_to='courses/videos')),
                ('file', models.FileField(blank=True, null=True, upload_to='courses/files')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='courses.section')),
            ],
        ),
    ]