import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:front/config/Locator.dart';
import 'package:front/models/group/group_model.dart';
import 'package:front/view_models/group/groups_view_model.dart';
import 'package:front/views/components/widgets.dart';
import 'package:front/views/mobile/groups/group_add_view.dart';

class GroupListView extends StatefulWidget {
  const GroupListView({Key? key}) : super(key: key);

  @override
  State<GroupListView> createState() => _GroupListViewState();
}

class _GroupListViewState extends State<GroupListView> {

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(bottom: 8),
        child: Stack(
          children:[
            Positioned.fill(
                child: FutureBuilder(
                  future: getIt.get<GroupsViewModel>().GetAllGroups(),
                  builder: (context, snapshot) {
                    if(snapshot.hasData) {
                      List<GroupViewModel>? data = snapshot.data as List<GroupViewModel>?;
                      if(data != null) {
                        return ListView.separated(
                            padding: const EdgeInsets.all(12),
                            itemCount: data.length,
                            separatorBuilder: (context, index) {
                              return const SizedBox(height: 8);
                            },
                            itemBuilder: (context, index) {
                              return GroupCard(data[index]);
                            }
                        );
                      }
                    }  else if (snapshot.hasError) {
                      return Text("${snapshot.error}");
                    }
                    return const CircularProgressIndicator();
                  }
                )
            ),
            Align(
              alignment: Alignment.bottomRight,
              child: MaterialButton(
                onPressed: () {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) => _buildPopupDialog(context),
                  );
                },
                color: Colors.green,
                textColor: Colors.white,
                child: const Icon(
                  Icons.add,
                  size: 24,
                ),
                padding: const EdgeInsets.all(16),
                shape: const CircleBorder(),
              ),
            ),
          ]
      )
    );
  }
}

class GroupCard extends StatelessWidget {
  GroupViewModel group = GroupViewModel();
  GroupCard(this.group);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Container(
          color: Colors.red.shade200,
          height: 150,
          width: double.infinity,
          child: Center(
              child: Text(group.name)
          )
        ),
      )
    );
  }
}

Widget _buildPopupDialog(BuildContext context) {

  return AlertDialog(
    title: Text("Creer un groupe : "),
    content: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const <Widget>[
        GroupAdd()
      ],
    ),
    actions: <Widget>[
      TextButton(
        onPressed: () {
          Navigator.of(context).pop();
        },
        style: TextButton.styleFrom(
            primary: Colors.grey
        ),
        child: const Text("Fermer"),
      ),
    ],
  );
}
