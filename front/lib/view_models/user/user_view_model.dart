import 'package:front/models/user/user_model.dart';
import 'package:front/services/user/user_api.dart';

class UserViewModel {
  UserRepository? userRepository;
  User user = User();
  UserViewModel({this.userRepository});

  Future<User> CheckAuthUser() async {
    user = await userRepository!.CheckAuthUser();
    return user;
  }

  Future<User> LogIn(String identifier, String password) async {
    user = await userRepository!.LogIn(identifier, password);
    return user;
  }
}