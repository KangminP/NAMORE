from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("", views.index, name="index"),
    path("recommand2", views.recommand2, name="recommand2"),
    path("recommand3", views.recommand3, name="recommand3"),
]
