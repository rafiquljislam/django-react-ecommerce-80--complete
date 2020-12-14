from django.contrib import admin
from .models import (
    Customer,
    Category,
    Cart,
    Product,
    CartProduct,
    Order,
    )

admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(Order)

class CartProductAdmin(admin.ModelAdmin):
    list_display=('cart','price','quantity','subtotal')
admin.site.register(CartProduct,CartProductAdmin)