from django.urls import path

from books.views import NewsListView, AddWish, RemoveWish

app_name = 'books'

urlpatterns = [
    # pages
    path('newslist/', NewsListView.as_view(), name='NewsList'),

    # functions
    path('addWish/', AddWish, name='AddWish'),
    path('removeWish/', RemoveWish, name='RemoveWish'),
]
