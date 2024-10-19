import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:html/parser.dart' show parse;
import 'package:html/dom.dart';

void main(List<String> arguments) async {
  List<Map<String, dynamic>> finalData = [];
  var data = json.decode(File('../raw_output.json').readAsStringSync());
  var link = data['fragmentation_link'] as String;
  var media = data['data'] as List;
  print(link);
  for (var element in media) {
    Map<String, dynamic> obj = {...element};
    var ids = element['ids'] as List?;
    List mediaLinks = obj['mediaLinks'];
    obj['mediaLinks'] = mediaLinks;
    if (ids != null) {
      for (var id in ids) {
        var data = await parseIds(id, link);
        mediaLinks.add(data);
      }
    }
    finalData.add(obj);
  }
  File('cleaned_data.json').writeAsStringSync(json.encode(finalData));
  print('All done');
}

Future<Map<String, dynamic>> parseIds(String id, String baseLink) async {
  Dio dio = Dio();
  String url = baseLink + id;
  var res = await dio.get(url);
  Document document = parse(res.data);

  // Check for video player
  Element? videoElement = document.querySelector('.mp4-player.thumb-wpr');
  if (videoElement != null) {
    String videoTitle = document
            .querySelector('.side-media-disc .lesson-title a')
            ?.text
            .trim() ??
        'No video title found';
    String? videoLink = videoElement.attributes['data-media'];
    print('Video link: $videoLink');
    return {
      "link": videoLink,
      "videoTitle": videoTitle,
    };
  }

  // Check for audio player
  Element? audioElement = document.querySelector('.mp3-player');
  if (audioElement != null) {
    String audioTitle =
        document.querySelector('h2.lesson-title a')?.text.trim() ??
            'No audio title found';
    String audioLink =
        audioElement.attributes['data-media'] ?? 'No audio link found';
    print('Audio link: $audioLink');
    return {"link": audioLink, "audioTitle": audioTitle};
  }

  throw Exception('Could not find');
}
