import 'package:dio/dio.dart';
import 'package:front/app_config.dart';
import 'package:front/models/user/user_model.dart';
import 'package:front/utils/Locator.dart';
import 'package:front/utils/local_storage.dart';

abstract class UserRepository{
  Future<User> CheckAuthUser();
  Future<User> LogIn(String identifier, String password);
}

class UserApi extends UserRepository{
  @override
  Future<User> CheckAuthUser() async {
    String token = await getIt.get<UserSharedPreferences>().getToken();
    User user = User();
    try {
      var response = await Dio().get("${getIt.get<AppConfig>().baseUrl}api/users/me",
      options: Options(headers: {'Authorization': 'Bearer $token'})
      );
      user = User.fromJson(response.data);
    } catch (exception) {
      print(exception);
    }
    return user;
  }

  @override
  Future<User> LogIn(String identifier, String password) async {
    User user = User();
    try{
      var response = await Dio().post("${getIt.get<AppConfig>().baseUrl}api/auth/local",
          data: {
            'identifier': identifier,
            'password': password
          }
      );
      await getIt.get<UserSharedPreferences>().setToken(response.data['jwt']);
      user = User.fromJson(response.data['user']);
    }catch(exception) {
      print(exception);
    }
    return user;
  }
}