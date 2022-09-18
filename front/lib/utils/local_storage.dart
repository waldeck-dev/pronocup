import 'package:shared_preferences/shared_preferences.dart';

class UserSharedPreferences {
  ///
  /// Instantiation of the SharedPreferences library
  ///
  final String _kToken = "";

  /// ------------------------------------------------------------
  /// Method that returns the user token
  /// ------------------------------------------------------------
  Future<String> getToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_kToken) ?? '';
  }

  /// ----------------------------------------------------------
  /// Method that saves the user token
  /// ----------------------------------------------------------
  Future<bool> setToken(String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(_kToken, value);
  }
}