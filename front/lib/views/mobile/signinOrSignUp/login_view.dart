import 'package:flutter/material.dart';
import 'package:front/constants.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:front/utils/Locator.dart';
import 'package:front/view_models/user/user_view_model.dart';
import 'package:front/views/mobile/main_view.dart';

class LoginScreen extends StatelessWidget {
  Duration get loginTime => const Duration(milliseconds: 2250);
  UserViewModel userViewModel = getIt.get<UserViewModel>();

  Future<String?> _authUser(LoginData data) {
    return Future.delayed(loginTime).then((_) async {
      await userViewModel.LogIn(data.name, data.password);
      if(userViewModel.user.id != null) {
        return null;
      } else {
        return 'Email or password does not match';
      }
    });
  }

  Future<String?> _signupUser(SignupData data) {
    debugPrint('Signup Name: ${data.name}, Password: ${data.password}');
    return Future.delayed(loginTime).then((_) {
      return null;
    });
  }

  Future<String> _recoverPassword(String name) {
    debugPrint('Name: $name');
    return Future.delayed(loginTime).then((_) {
      return '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      title: 'Pronocup',
      logo: AssetImage('assets/images/logo_gold_soccer_ball.png'),
      onLogin: _authUser,
      onSignup: _signupUser,
      onSubmitAnimationCompleted: () {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (context) => const MainScreen(),
        ));
      },
      onRecoverPassword: _recoverPassword,
    );
  }
}
