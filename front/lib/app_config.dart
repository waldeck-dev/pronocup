//https://sebastien-arbogast.com/2022/05/02/multi-environment-flutter-projects-with-flavors/

import 'package:flutter/material.dart';

enum Environment { dev, prod }

class AppConfig {
  final String baseUrl;

  const AppConfig({
    required this.baseUrl,
  }) : super();

}