// var foldersParent = document.querySelector("body > div.container > div.portalpage > section > div.right-nav > div:nth-child(3) > ul")
// var folders = foldersParent.children;

// /*
// {
// title:"Sample title" , 
// link:"Sample link" , 
// }
// */

// foldersData = [];


// for (let index = 0; index < folders.length; index++) {
//     const folder = folders[index];
//     var title = folder.querySelector(' a > label').innerText
//     var link = folder.querySelector('a').getAttribute('href')
//     var obj = { link: link, title: title }
//     foldersData.push(obj)

// }

// console.log(foldersData)

//? this is the paginator scraper
let links = []
var parent = document.querySelector("body > div.container > div.portalpage > section > div.right-nav > ul")
var children = parent.children;
for (let index = 0; index < children.length; index++) {
    const element = children[index];
    var link = element.querySelector('a').getAttribute('href')
    links.push(link)

}
console.log(links)
[
    "index.php?pageno=1&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=2&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=3&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=4&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=5&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=6&page=lecview&sid=1074&read=0&lg=0&kh=0",
    "index.php?pageno=2&page=lecview&sid=1074&read=0&lg=0&kh=0"
]