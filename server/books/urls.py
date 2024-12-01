from django.urls import path

from books.views import NewsListView
app_name = 'books'

urlpatterns = [
    path('newslist/', NewsListView.as_view(), name='NewsList'),
]
