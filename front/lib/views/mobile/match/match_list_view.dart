import 'package:flutter/material.dart';


class MatchListView extends StatefulWidget {
  const MatchListView({Key? key}) : super(key: key);

  @override
  State<MatchListView> createState() => _MatchListViewState();
}

class _MatchListViewState extends State<MatchListView> {
  @override
  Widget build(BuildContext context) {
    return ListView.separated(
          padding: const EdgeInsets.all(12),
          itemCount: 5,
          separatorBuilder: (context, index) {
            return const SizedBox(height: 12);
          },
          itemBuilder: (context, index) {
            return matchCard(index);
          }
    );
  }
}

Widget matchCard(int index) => ClipRRect(
  borderRadius: BorderRadius.circular(20),
  child: Container(
    color: Colors.red.shade200,
    height: 150,
    width: double.infinity,
  ),
);
