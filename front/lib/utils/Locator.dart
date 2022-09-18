import 'package:get_it/get_it.dart';

import 'local_storage.dart';

final getIt = GetIt.instance;

void setUpLocator() {
  getIt.registerSingleton<UserSharedPreferences>(UserSharedPreferences());
}