from django.conf.urls import url
from django.urls import path , include
from django.conf import settings

urlpatterns = [
   path('', include('auth_jwt.urls')),
]
