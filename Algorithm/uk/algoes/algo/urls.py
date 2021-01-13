from django.urls import path
from . import views

app_name = "algo"

urlpatterns = [
    path("", views.home, name="home"),
    path("choice/", views.choice, name="choice"),
    path("recommend/", views.recommend, name="recommend"),
]
