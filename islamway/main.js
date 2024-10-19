// //? scroll to the very bottom
// await(async function autoScroll() {
//     let prevHeight = document.body.scrollHeight;

//     // Function to scroll to the bottom of the page
//     function scrollToEnd() {
//         window.scrollTo(0, document.body.scrollHeight);
//     }

//     // Scroll and wait until no more content is loaded
//     while (true) {
//         scrollToEnd();
//         await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay as needed

//         let newHeight = document.body.scrollHeight;
//         if (newHeight === prevHeight) {
//             break; // Exit the loop if the height hasn't changed
//         }
//         prevHeight = newHeight;
//     }

//     console.log("No more content to load.");
// })();

//? cleaning ads
var ads = document.querySelectorAll('.ads_wrap_box')
for (let index = 0; index < ads.length; index++) {
    const element = ads[index];
    element.parentElement.remove()

}

//? getting data
let data = []
var parent = document.querySelector("#content-wpr > div > div.col-sm-12")
var dataContainers = parent.querySelectorAll('.iw-panel');

for (let index = 0; index < dataContainers.length; index++) {
    const mediaContainer = dataContainers[index];
    var time_element = mediaContainer.querySelector('div');
    var time = time_element.getAttribute('data-rank')
    var obj = {}
    obj['time'] = time
    data.push(obj)

    var image = mediaContainer.querySelector(" div > div.fragment-wpr > div.fragment-inner > div > div.side-media-thumb > div > img.veiled")
    var imageSrc = image?.getAttribute('src') || null
    if (imageSrc) {
        obj['image'] = imageSrc
    }


    // slim scroll div
    var slimScrollDiv = mediaContainer.querySelector(".collection-items");
    if (slimScrollDiv) {
        var list = slimScrollDiv.querySelector('ul')
        var items = list.querySelectorAll('li')
        let ids = []
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            var lesson_id = element.getAttribute('data-id')
            ids.push(lesson_id)
        }
        obj['ids'] = ids

    }

    // media link itself
    var mediaLink = mediaContainer.querySelector('.mp4-player')
    var mediaLinkHref = mediaLink?.getAttribute('data-media') || null
    let links = []
    if (mediaLinkHref) {
        var videoTitle = mediaContainer.querySelector("div.side-media-disc > h2 > a")
        links.push({ link: mediaLinkHref, videoTitle: videoTitle.innerText })
    }
    // the lessons might be more than one in the same container
    var mp3Player = mediaContainer.querySelector('.mp3-player')
    var mp3Link = mp3Player?.getAttribute('data-media') || null
    if (mp3Link) {
        var audioTitle = mediaContainer.querySelector(".lesson-title")
        links.push({ link: mp3Link, audioTitle: audioTitle.innerText })
    }
    obj['mediaLinks'] = links






}
console.log(data)

fragmentation_link = 'https://ar.islamway.net/_efragment/{frgmentId}'


