from django.urls import path

from books.views import NewsListView, AddWish, RemoveWish, AddBasket, RemoveBasket

app_name = 'books'

urlpatterns = [
    # pages
    path('newslist/', NewsListView.as_view(), name='NewsList'),

    # functions
    path('addWish/', AddWish, name='AddWish'),
    path('removeWish/', RemoveWish, name='RemoveWish'),

    path('addBasket/', AddBasket, name='AddBasket'),
    path('removeBasket/', RemoveBasket, name='RemoveBasket'),
]
