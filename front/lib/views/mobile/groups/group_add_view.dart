import 'package:flutter/material.dart';
import 'package:front/views/components/widgets.dart';

class GroupAdd extends StatefulWidget {
  const GroupAdd({Key? key}) : super(key: key);

  @override
  State<GroupAdd> createState() => _GroupAddState();
}

class _GroupAddState extends State<GroupAdd> {
  final _formKey = GlobalKey<FormState>();
  final name = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Form(
            key: _formKey,
              child: TextFormField(
                controller: name,
                decoration: const InputDecoration(
                  icon: Icon(Icons.text_fields),
                  labelText: "Nom du groupe"
                ),
              )
          ),
          addVerticalSpace(12),
          Center(
            child: ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {

                }
              },
              child: Text("Enregistrer"),
            ),
          )
        ],
      ),
    );
  }
}
