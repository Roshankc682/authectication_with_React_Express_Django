from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)



# make a env file and import all requirements
urlpatterns = [
 path('api/register/',views.RegisterView.as_view(), name='Register_account'),
 path('api/token/api_hide/', views.MyTokenObtainPairView.as_view(), name='Token_create'),
 path('api/token/refresh', views.new_access_token, name='_New_access_token'),
 path('api/dashboard/', views.get_data_of_user, name='DashBoard_with_access_valid_token'),
 path('api/token/token_refresh', views.user_new_access_and_refrsh_token_and, name='Token_refresh_of_reflecting_acces_token'),
]