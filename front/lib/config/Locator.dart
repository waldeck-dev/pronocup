import 'package:front/config/app_config.dart';
import 'package:front/services/group/group_api.dart';
import 'package:front/services/user/user_api.dart';
import 'package:front/view_models/group/groups_view_model.dart';
import 'package:front/view_models/user/user_view_model.dart';
import 'package:get_it/get_it.dart';

import 'local_storage.dart';

final getIt = GetIt.instance;

void setUpLocator(url) {
  getIt.registerSingleton<AppConfig>(AppConfig(baseUrl: url));
  getIt.registerSingleton<UserSharedPreferences>(UserSharedPreferences());
  getIt.registerSingleton<UserViewModel>(UserViewModel(userRepository: UserApi()));
  getIt.registerSingleton<GroupsViewModel>(GroupsViewModel(groupRepository: GroupApi()));
}