import uuid as uuid

from django.contrib.auth import get_user_model
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


class Genre(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    title = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name="Title"
    )

    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

    def __str__(self):
        return self.title


class Book(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    title = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        verbose_name="Title"
    )

    desc = models.TextField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name="Description"
    )

    preview = models.ForeignKey(
        File,
        null=True,
        blank=True,
        unique=False,
        on_delete=CASCADE
    )

    images = models.ManyToManyField(
        File,
        null=True,
        blank=True,
        verbose_name="Images",
        related_name="book_images"
    )

    authors = models.ManyToManyField(
        Author,
        null=True,
        blank=True,
        verbose_name="Authors",
        related_name="book_authors"
    )

    genres = models.ManyToManyField(
        Genre,
        null=True,
        blank=True,
        verbose_name="Genres",
        related_name="book_genres"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=False,
    )

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

    def __str__(self):
        return self.title


class Order(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    user = models.ForeignKey(
        get_user_model(),
        null=False,
        blank=False,
        unique=False,
        on_delete=CASCADE
    )

    books = models.ManyToManyField(
        Book,
        null=False,
        blank=False,
        verbose_name="Books",
        related_name="order_books"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=False,
    )

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return self.user
