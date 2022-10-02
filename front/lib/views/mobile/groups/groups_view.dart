import 'package:flutter/material.dart';
import 'package:front/views/components/widgets.dart';
import 'package:front/views/mobile/groups/group_list_view.dart';
import 'package:front/views/mobile/groups/user_groups_view.dart';

class GroupsView extends StatefulWidget {
  const GroupsView({Key? key}) : super(key: key);

  @override
  State<GroupsView> createState() => _GroupsViewState();
}

class _GroupsViewState extends State<GroupsView> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          ColoredBox(
              color: Theme.of(context).primaryColor,
              child: TabBar(
                indicatorColor: Colors.black54,
                labelColor: Theme.of(context).primaryColor,
                unselectedLabelColor: Colors.white,
                indicator: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10)
                  ),
                  color: Colors.white
                ),
                tabs: const [
                  Tab(text: "Groupes disponible"),
                  Tab(text: "Mes Groupes")
                ],
              ),
          ),
          const Expanded(
              child: TabBarView(
                children: [
                  GroupListView(),
                  UserGroups()
                ],
              )
          )
        ],
      ),
    );
  }
}
