import uuid as uuid

from django.core.validators import FileExtensionValidator
from django.db import models
from django.db.models import CASCADE


class File(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    file = models.FileField(
        null=False,
        blank=False,
        validators=[FileExtensionValidator(['jpg', 'png'])],
        upload_to='images',
        verbose_name='Files'
    )

    class Meta:
        verbose_name = 'File'
        verbose_name_plural = 'Files'

    def __str__(self):
        return f'{self.uuid}'


class Author(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    fullname = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name="Fullname"
    )

    short_name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        verbose_name="Short Name"
    )

    desc = models.TextField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name="Description"
    )

    avatar = models.ForeignKey(
        File,
        null=True,
        blank=True,
        unique=False,
        on_delete=CASCADE
    )

    class Meta:
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'

    def __str__(self):
        return self.fullname
