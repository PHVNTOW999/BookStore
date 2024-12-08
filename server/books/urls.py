from django.urls import path

from books.views import NewsListView, AddWish, RemoveWish, AddBasket, RemoveBasket, AuthorListView, GenreListView

app_name = 'books'

urlpatterns = [
    # lists
    path('newslist/', NewsListView.as_view(), name='NewsList'),
    path('authorlist/', AuthorListView.as_view(), name='AuthorList'),
    path('genrelist/', GenreListView.as_view(), name='GenreList'),

    # functions
    path('addWish/', AddWish, name='AddWish'),
    path('removeWish/', RemoveWish, name='RemoveWish'),

    path('addBasket/', AddBasket, name='AddBasket'),
    path('removeBasket/', RemoveBasket, name='RemoveBasket'),
]
