from rest_framework import viewsets,views
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST 
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import generics,mixins, views
from .models import *
from .serializers import *



class UserViewset(views.APIView):
    qureryset = User.objects.all()
    permission_classes = (AllowAny, )
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":"Update Success full","data":serializers.data})
        return Response({"error":True,"message":"A user with that username already exists! Try Anather Username"})



class ProfileViewset(views.APIView):
    permission_classes= [IsAuthenticated, ]
    authentication_classes= [TokenAuthentication, ]

    def get(self,request):
        try:
            query = Customer.objects.get(customer=request.user)
            serializer = ProfileSerilizer(query)
            response_message={"error":False,"data":serializer.data}
        except:
            response_message = {"error":True,"message":"Somthing is Wrong,Try agane"}
        return Response(response_message)







class ProductViewset(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    lookup_field = 'id'

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class Mycarts(viewsets.ViewSet):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def list(self,request):
        queryset = Cart.objects.filter(customer=request.user.customer)
        serializers = CartSerializer(queryset,many=True)
        all_date=[]
        for cart in serializers.data:
            # print(cart['id'],"$$$$ cart")
            cartproduct = CartProduct.objects.filter(cart=cart['id'])
            # print(cartproduct,"$$$$single cartproduct")
            cartproduct_serializer = CartproductSerializer(cartproduct,many=True)
            cart['cartproducts'] = cartproduct_serializer.data
            all_date.append(cart)

        return Response(all_date)


class Editcartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cart_obj = cp_obj.cart

        cp_obj.quantity -=1
        cp_obj.subtotal -=cp_obj.price
        cp_obj.save()

        cart_obj.total -=cp_obj.price
        cart_obj.save()
        if(cp_obj.quantity==0):
            cp_obj.delete()        
        return Response({"message":"CartProduct Update","product":request.data['id']})


class Updatecartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cart_obj = cp_obj.cart

        cp_obj.quantity +=1
        cp_obj.subtotal +=cp_obj.price
        cp_obj.save()

        cart_obj.total +=cp_obj.price
        cart_obj.save()     
        return Response({"message":"CartProduct Add Update","product":request.data['id']})



class Delatecartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()        
        return Response({"message":"CartProduct Delated","product":request.data['id']})




class Delatefullcard(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        try:
            card_obj = Cart.objects.get(id=request.data['id'])
            card_obj.delete()
            responsemessage = {"mesage":"allis wright"}
        except:
            responsemessage = {"mesage":"Somthing wright"}
        return Response(responsemessage)



class OrderViewset(viewsets.ViewSet):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def list(self,request):
        queryset = Order.objects.filter(cart__customer=request.user.customer)
        serializers = OrderSerializer(queryset,many=True)
        all_date=[]
        for cart in serializers.data:
            cartproduct = CartProduct.objects.filter(cart_id=cart['cart']['id'])
            cartproduct_serializer = CartproductSerializer(cartproduct,many=True)
            cart['cartproducts'] = cartproduct_serializer.data
            all_date.append(cart)
        return Response(all_date)

    def retrieve(self,request,pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            # order = get_object_or_404(queryset,pk=pk)
            serializers = OrderSerializer(queryset)
            # print(serializers.data["cart"])
            data = serializers.data
            all_date=[]
            # for cart in serializers.data:
            cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cartproduct_serializer = CartproductSerializer(cartproduct,many=True)
            data['cartproducts'] = cartproduct_serializer.data
            all_date.append(data)
            response_message = {"error":False,"data":all_date}
        except:
            response_message = {"error":True,"data":"No data Found for This id"}

        return Response(response_message)
    
    def create(self,request):
        cart_id = request.data["cartId"]
        cart_obj = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        mobile = request.data["mobile"]
        email = request.data["email"]
        cart_obj.complit=True
        cart_obj.save()
        created_order = Order.objects.create(
            cart=cart_obj,
            address=address,
            mobile=mobile,
            email=email,
            total=cart_obj.total,
            discount=3,
            order_status="Order Received"
        )

        return Response({"message":"order Resebed","cart id":cart_id,"order id":created_order.id})
        
    def destroy(self,request,pk=None):
        try:
            order_obj=Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            # print(cart_obj,"cart_obj")
            order_obj.delete()
            cart_obj.delete()
            responsemessage = {"erroe":False,"message":"Order delated","order id":pk}
        except:
            responsemessage = {"erroe":True,"message":"Order Not Found"}
        return Response(responsemessage)


class AddtoCart(viewsets.ViewSet):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def create(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        # print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user.customer).filter(complit=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complit=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.selling_price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
            else:
                # print(cart_cart)
                # print("NEW CART CREATED")
                Cart.objects.create(customer=request.user.customer,total=0,complit=False)
                new_cart = Cart.objects.filter(customer=request.user.customer).filter(complit=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total +=product_obj.selling_price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(response_mesage)



