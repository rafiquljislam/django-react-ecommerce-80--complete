from django.urls import path,include
from rest_framework import routers
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

route = routers.DefaultRouter()
route.register('addtocart',AddtoCart,basename="add_to_cart")
route.register('mycart',Mycarts,basename="Mycarts")
route.register('myorder',OrderViewset,basename="OrderViewset")

urlpatterns = [
    path('',include(route.urls)),
    path('product/',ProductViewset.as_view(),name='product'),
    path('product/<int:id>/',ProductViewset.as_view(),name='product'),
    path("editcartproduct/", Editcartproduct.as_view(), name="editcartproduct"),
    path("delatecartproduct/",Delatecartproduct.as_view(), name="delatecartproduct"),
    path("updatecartproduct/",Updatecartproduct.as_view(), name="updatecartproduct"),
    path("delatefullcard/",Delatefullcard.as_view(), name="delatefullcard"),
    path('register/',UserViewset.as_view(),name='user'),
    path('login/',obtain_auth_token),
    path("profile/",ProfileViewset.as_view(),name="profile")
]
