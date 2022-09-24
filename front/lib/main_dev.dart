import 'package:flutter/material.dart';
import 'package:front/theme.dart';
import 'package:front/utils/Locator.dart';
import 'package:front/view_models/user/user_view_model.dart';
import 'package:front/views/mobile/main_view.dart';
import 'app_config.dart';
import 'package:front/views/mobile/signinOrSignUp/login_view.dart';

void main() {
  setUpLocator("http://192.168.56.1:1337/");
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    UserViewModel userViewModel = getIt.get<UserViewModel>();
    userViewModel.CheckAuthUser();
    return MaterialApp(
      title: 'Flutter Demo',
      theme: lightThemeData(context),
      darkTheme: darkThemeData(context),
      home: userViewModel.user.id != null ? MainScreen() : LoginScreen(),
    );
  }
}