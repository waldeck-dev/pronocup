import 'package:animations/animations.dart';
import 'package:flutter/material.dart';
import 'package:front/views/mobile/profile/profile_view.dart';
import 'groups/group_list_view.dart';
import 'match/match_list_view.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int pageIndex = 0;
  List<Text> titleList = <Text>[
    const  Text('Match'),
    const  Text('Group'),
    const  Text('Profile')
  ];
  List<Widget> pageList = <Widget>[
    const MatchListView(),
    const GroupListView(),
    const ProfileView()
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: titleList[pageIndex],
      ),
      body: PageTransitionSwitcher(
        transitionBuilder: (child, primaryAnimation, secondaryAnimation) =>
            FadeThroughTransition(
                animation: primaryAnimation,
                secondaryAnimation: secondaryAnimation,
                child: child,
            ),
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/foot_background.jpg"),
              fit: BoxFit.cover,
            )
          ),
          child: pageList[pageIndex],
        )
        ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: pageIndex,
        onTap: (value) {
          setState(() {
            pageIndex = value;
          });
        },
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: "match"),
          BottomNavigationBarItem(icon: Icon(Icons.group), label: "group"),
          BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: "Profile"),
          /*BottomNavigationBarItem(
              icon: CircleAvatar(
                radius: 14,
                backgroundImage: AssetImage(""),
              ),
              label: "Profile"
          ),*/
        ],
      ),
    );
  }
}
