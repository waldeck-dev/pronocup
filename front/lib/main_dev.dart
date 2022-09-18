import 'package:flutter/material.dart';
import 'package:front/theme.dart';
import 'package:front/utils/Locator.dart';
import 'app_config.dart';
import 'package:front/views/mobile/signinOrSignUp/login_view.dart';

void main() {
  const configuredApp = AppConfig(
      child: MyApp(),
      environment: Environment.dev,
      baseUrl: "http://localhost:1337/"
  );
  setUpLocator();
  runApp(configuredApp);
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