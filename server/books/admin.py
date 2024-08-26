from django.contrib import admin
from books import models


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    list_display = (
        'file',
        'uuid'
    )


@admin.register(models.Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        'fullname',
        'short_name',
        'desc',
        'uuid'
    )
