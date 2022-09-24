import 'package:dio/dio.dart';
import 'package:front/config/app_config.dart';
import 'package:front/models/group/group_model.dart';
import 'package:front/config/Locator.dart';
import 'package:front/config/local_storage.dart';

abstract class GroupRepository {
  Future<List<Group>> GetAllGroups();
  Future<Group> CreateGroup(String name);
  Future<Group> UpdateGroup(int id, String name);
}

class GroupApi extends GroupRepository{
  @override
  Future<List<Group>> GetAllGroups() async {
    String token = await getIt.get<UserSharedPreferences>().getToken();
    List<Group> groups = [];
    try {
      var response = await Dio().get("${getIt.get<AppConfig>().baseUrl}api/groups/",
          options: Options(headers: {'Authorization': 'Bearer $token'})
      );
      var list = response.data as List;
      groups = list.map((group) => Group.fromJson(group)).toList();
    } catch(exception) {
      print(exception);
    }
    return groups;
  }

  @override
  Future<Group> CreateGroup(String name) async {
    String token = await getIt.get<UserSharedPreferences>().getToken();
    Group group = Group();
    try {

    } catch(exception) {

    }
    return group;
  }

  @override
  Future<Group> UpdateGroup(int id, String name) async {
    String token = await getIt.get<UserSharedPreferences>().getToken();
    Group group = Group();
    try {

    } catch(exception) {

    }
    return group;
  }
  
  
}