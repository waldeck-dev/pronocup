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
          itemCount: 1,
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

/*class MatchCard extends StatelessWidget {
  const MatchCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Container(
          color: Colors.red.shade200,
          child: Image.network(
            'https://source.unsplash.com/random?sig'
          ),
        ),
      ),
    );
  }
}*/
