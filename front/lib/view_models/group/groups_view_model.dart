import 'package:front/models/group/group_model.dart';
import 'package:front/services/group/group_api.dart';
import 'package:front/views/mobile/groups/group_list_view.dart';

class GroupsViewModel {
  GroupRepository? groupRepository;
  List<GroupViewModel> listGroup = [];
  GroupsViewModel({this.groupRepository});

  Future<List<GroupViewModel>> GetAllGroups() async {
    List<Group> list = await groupRepository!.GetAllGroups();
    return listGroup;
  }
}

class GroupViewModel {
  Group? groupModel;
  GroupViewModel({this.groupModel});

  get id => groupModel?.id;
  get name => groupModel?.name;
}