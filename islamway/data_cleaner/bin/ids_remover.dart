import 'dart:convert';
import 'dart:io';

void main(List<String> args) {
  List<Map<String, dynamic>> finalData = [];
  var data = json.decode(File('cleaned_data.json').readAsStringSync());
  var media = data as List;
  for (var element in media) {
    Map<String, dynamic> obj = {...element};
    obj.remove('ids');
    List mediaLinks = obj['mediaLinks'];
    var cleaned = removeFirstOccurrence(mediaLinks);
    obj['mediaLinks'] = cleaned;
    finalData.add(obj);
  }
  File('ready_data.json').writeAsStringSync(json.encode(finalData));
  print('All done');
}

List<Map<String, dynamic>> removeFirstOccurrence(List mediaLinks) {
  List<Map<String, dynamic>> cleaned = [];

  for (var media in mediaLinks) {
    String link = media['link'];
    int index = cleaned.indexWhere((element) => element['link'] == link);
    if (index != -1) {
      cleaned.removeAt(index);
    }
    cleaned.add(media);
  }

  return cleaned;
}
