from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.views import *
from .models import *
from .serializers import UserSerializer, MyTokenObtainPairSerializer, Obtain_Refresh_And_Access
from django.core.mail import EmailMultiAlternatives
from auth_jwt.models import Users
from email_validator import validate_email , EmailNotValidError



from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, MyTokenObtainPairSerializer, Obtain_Refresh_And_Access

# Register class
class RegisterView(GenericAPIView):
    def post(self, request, *args, **kwargs):
        try:
            json_data = request.body
            stream = io.BytesIO(json_data)
            user_data_dic = JSONParser().parse(stream)
            # print(user_data_dic)
            len_pass = len(user_data_dic["password"])
            # len_name = len(user_data_dic["username"])
            len_first = len(user_data_dic["first_name"])
            len_last = len(user_data_dic["last_name"])
            try:
                valid = validate_email(user_data_dic["email"])
                email = valid.email
            except EmailNotValidError as e:
                # print(str(e))
                return Response({"message": "Provide a valid email "}, status=status.HTTP_400_BAD_REQUEST)
            # if len_pass <= 5:
            #     return Response({"message": "Password must be at least 5 character !!! "},
            #                     status=status.HTTP_400_BAD_REQUEST)
            # # if len_name <= 5:
            # #     return Response({"message": "Name must be at least 5 character !!! "},
            # #                     status=status.HTTP_400_BAD_REQUEST)
            # if len_first <= 1:
            #     return Response({"message": "First name must be at least 2 character !!! "},
            #                     status=status.HTTP_400_BAD_REQUEST)
            # if len_last <= 1:
            #     return Response({"message": "Last name must be at least 2 character !!! "},
            #                     status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({"message": "check whether firstname, lastname,email or password missing"},status=status.HTTP_400_BAD_REQUEST)
        
        import uuid
        uuid = uuid.uuid4()
        user_data_dic['username'] = user_data_dic.get('first_name');
        # print(user_data_dic)
        user_data_dic['id'] = str(uuid);
        uuid__duplicate = list(Users.objects.values("id"))
        email__duplicate = list(Users.objects.values("email"))
        # print(len(uuid__duplicate))
        if(len(uuid__duplicate) == 0):
            pass
        else:
            # Eliminate Loop if possible it gonna  take time
            for iid in range(len(uuid__duplicate)):
                if((uuid__duplicate[iid]["id"]) == uuid):
                    return Response({"message": "Internal Error !!! "},status=status.HTTP_400_BAD_REQUEST)
            for _email_ in range(len(email__duplicate)):
                if email__duplicate[_email_]["email"] == user_data_dic["email"]:
                    return Response({"message": "Email already in use "},status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=user_data_dic)
        if serializer.is_valid():
            serializer.save()
            import time
            time.sleep(3) # Sleep for 3 seconds
            return Response({
                "true":1,
                "message":"Account created with "+user_data_dic.get('email'),
                "email": user_data_dic.get('email'),
                "username": user_data_dic.get('username'),
                "first_name": user_data_dic.get('first_name'),
                "last_name": user_data_dic.get('last_name'),
                "id": user_data_dic.get('id')
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# login class
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def new_access_token(request):
    try:
        if request.COOKIES.get('refresh'):
            token = request.COOKIES.get('refresh')
         
            try:
                splitted_token = token.split(".")
                second_base64_string = splitted_token[1]
                second_base64_string_bytes = second_base64_string.encode('ascii')
                jwt_bytes = base64.b64decode(second_base64_string_bytes + b'=' * (-len(second_base64_string_bytes) % 4))
                jwt_decoded = jwt_bytes.decode('ascii')
                jwt_decoded = json.loads(jwt_decoded)
                exp = jwt_decoded["exp"]
                import time
                time_expired_check = exp - time.time()
                if time_expired_check <= 0:
                    return Response({"message": "Refresh token Expired"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    pass
                if jwt_decoded["token_type"] != "refresh":
                    return Response({"message": "Not valid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    pass
            except:
                response = Response({"message": "Refresh token not valid"}, status=status.HTTP_400_BAD_REQUEST)
                return response
            try:
                user = Users.objects.get(id=jwt_decoded["user_id"])
            except:
                response = Response({"message": "user not found"}, status=status.HTTP_400_BAD_REQUEST)
                return response
            # user = Users.objects.get(id=jwt_decoded["user_id"])
            refresh = Obtain_Refresh_And_Access.get_token(user)
            response = Response({"access": str(refresh.access_token)}, status=status.HTTP_200_OK)
            return response
        else:
            response = Response({"message": "Refresh token missing !! "}, status=status.HTTP_400_BAD_REQUEST)
            return response
    except:
        response = Response({"message": "Something went wrong !! "}, status=status.HTTP_400_BAD_REQUEST)
        return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_new_access_and_refrsh_token_and(request):
    try:
        if request.COOKIES.get('refresh'):
            token = request.COOKIES.get('refresh')
            try:
                splitted_token = token.split(".")
                second_base64_string = splitted_token[1]
                second_base64_string_bytes = second_base64_string.encode('ascii')
                jwt_bytes = base64.b64decode(second_base64_string_bytes + b'=' * (-len(second_base64_string_bytes) % 4))
                jwt_decoded = jwt_bytes.decode('ascii')
                jwt_decoded = json.loads(jwt_decoded)
                exp = jwt_decoded["exp"]
                import time
                time_expired_check = exp - time.time()
                if time_expired_check <= 0:
                    return Response({"message": "Refresh token Expired"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    pass
                if jwt_decoded["token_type"] != "refresh":
                    return Response({"message": "Not valid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    pass
            except:
                response = Response({"message": "Refresh token not valid"}, status=status.HTTP_400_BAD_REQUEST)
                return response
            if jwt_decoded["user_id"] == request.user.id:
                pass
            else:
                return Response({"message": "user not found"}, status=status.HTTP_400_BAD_REQUEST)
            user = Users.objects.get(id=request.user.id)
            refresh = Obtain_Refresh_And_Access.get_token(user)
            response = Response({"access": str(refresh.access_token)}, status=status.HTTP_200_OK)
            response.set_cookie('refresh', refresh, samesite="none", secure=True, httponly=True)
            return response
        else:
            response = Response({"message": "Refresh token missing !! "}, status=status.HTTP_400_BAD_REQUEST)
            return response
    except:
        response = Response({"message": "Something went wrong !! "}, status=status.HTTP_400_BAD_REQUEST)
        return response


# authentication of user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_data_of_user(request):
    try:
        # print(request.user.id)
        user_name = list(Users.objects.filter(id=request.user.id).values('username','email'))
        return Response(user_name, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Token was not valid"}, status=status.HTTP_400_BAD_REQUEST)
