# Generated by Django 3.1.4 on 2020-12-09 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartproduct',
            name='product',
        ),
        migrations.AddField(
            model_name='cartproduct',
            name='product',
            field=models.ManyToManyField(to='shop.Product'),
        ),
    ]