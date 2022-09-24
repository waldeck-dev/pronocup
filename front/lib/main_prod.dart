import 'package:flutter/material.dart';
import 'package:front/theme.dart';
import 'package:front/config/Locator.dart';
import 'package:front/views/mobile/signinOrSignUp/login_view.dart';

void main() {
  setUpLocator("http://");
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: lightThemeData(context),
      darkTheme: darkThemeData(context),
      home: LoginScreen(),
    );
  }
}