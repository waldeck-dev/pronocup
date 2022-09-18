//https://sebastien-arbogast.com/2022/05/02/multi-environment-flutter-projects-with-flavors/

import 'package:flutter/material.dart';

enum Environment { dev, prod }

class AppConfig extends InheritedWidget {
  final Environment environment;
  final String baseUrl;

  const AppConfig({
    Key? key,
    required Widget child,
    required this.environment,
    required this.baseUrl,
  }) : super(
    key: key,
    child: child,
  );

  static AppConfig of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<AppConfig>()!;
  }

  @override
  bool updateShouldNotify(covariant InheritedWidget oldWidget) => false;
}