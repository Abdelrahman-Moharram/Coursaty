# Generated by Django 5.0.4 on 2024-05-07 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_category_industry_subcategory_category_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
            preserve_default=False,
        ),
    ]