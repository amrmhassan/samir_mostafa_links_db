import 'dart:convert';
import 'dart:io';
import 'dart:math';

void main() {
  List finalData = [];
  var data =
      json.decode(File('./folders_data.json').readAsStringSync()) as List;
  data.forEach(
    (element) {
      int id = Random().nextInt(10000) + 1000;
      element['id'] = id;
      finalData.add(element);
      print(element);
    },
  );
  File('output.json').writeAsStringSync(json.encode(finalData));
}
