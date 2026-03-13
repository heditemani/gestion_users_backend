from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import RegisterSerializer, UserSerializer


User = get_user_model()


# REGISTER

class RegisterView(APIView):
    permission_classes = [AllowAny]  # nes lkol tnajam tsajal 

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message" : "User crée avec succés !",
                "user" : UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# LOGIN


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')


        user = authenticate(username = username, password = password)

        if user : 
            refresh = RefreshToken.for_user(user)
            return Response({
                "message" : "Login réussi !",
                "access"  : str(refresh.access_token),
                "refresh" : str(refresh),
                "user" : UserSerializer(user).data
            })
        
        return Response({
            "error" : "Username ou Password Incorrect" 
        },status=status.HTTP_401_UNAUTHORIZED)
    


#LOGOUT


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # ma ynajam yamalha ken eli aml login

    def post(self, request):
        try : 
            RefreshToken = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message" : "Lougout réussi !"})
        except :
            return Response({"message" : "Token Incorrect !"},status=status.HTTP_400_BAD_REQUEST )
        


#PROFILE









