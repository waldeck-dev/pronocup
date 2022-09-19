import 'package:front/app_config.dart';
import 'package:front/services/user/user_api.dart';
import 'package:front/view_models/user/user_view_model.dart';
import 'package:get_it/get_it.dart';

import 'local_storage.dart';

final getIt = GetIt.instance;

void setUpLocator(url) {
  getIt.registerSingleton<AppConfig>(AppConfig(baseUrl: url));
  getIt.registerSingleton<UserViewModel>(UserViewModel(userRepository: UserApi()));
  getIt.registerSingleton<UserSharedPreferences>(UserSharedPreferences());
}