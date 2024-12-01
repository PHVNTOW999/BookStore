from django.contrib import admin
from books import models


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    list_display = (
        'uuid',
        'file'
    )


@admin.register(models.Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        'fullname',
        'short_name',
        'desc',
        'uuid'
    )


@admin.register(models.Genre)
class TitleAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'uuid'
    )


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'uuid'
    )


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'created_at',
        'uuid'
    )
