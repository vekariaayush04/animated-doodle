async function getVideos() {
    const response = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=30")
    const jsonData = await response.json()
    return jsonData.data.data
}
function getVideoDiv(video) {
    const vDiv = document.createElement("a")
    const imgDiv = getThumbnail(video.snippet.thumbnails.high.url)
    const descDiv = getDescription(video.snippet.title , video.snippet.channelTitle , video.statistics.viewCount)
    vDiv.href = `https://www.youtube.com/watch?v=${video.id}`
    vDiv.target = "_blank"
    vDiv.appendChild(imgDiv)
    vDiv.appendChild(descDiv)
    vDiv.id = video.snippet.title
    return vDiv
}

function getThumbnail(url) {
    const imgDiv = document.createElement("img")
    imgDiv.src = url
    imgDiv.alt = ""
    imgDiv.style.borderRadius = "10px"
    return imgDiv
}

function getDescription(title , channelName , viewCount) {
    const descDiv = document.createElement("div")
    const titleDiv = document.createElement("div")
    const channelNameDiv = document.createElement("div")
    const viewCountDiv = document.createElement("div")

    //add title
    titleDiv.innerHTML = title
    titleDiv.style.fontWeight = "600"
    descDiv.appendChild(titleDiv)

    //add channelName
    channelNameDiv.innerHTML = channelName
    channelNameDiv.style.fontSize = "small"
    channelNameDiv.style.fontWeight = "600"
    channelNameDiv.style.color = "#878787"
    descDiv.appendChild(channelNameDiv)

    //add views
    if(viewCount >= 1000){
        viewCount = `${(viewCount/1000).toFixed(0)}k views`
    }
    viewCountDiv.innerHTML = viewCount
    viewCountDiv.style.fontSize = "small"
    viewCountDiv.style.color = "#878787"
    descDiv.appendChild(viewCountDiv)


    descDiv.style.color = "white"
    descDiv.style.padding = "5px"
    return descDiv
}

//getting videos and adding to the screen
const gridBox = document.getElementById("gridBox")
let divs = []
getVideos()
.then((d) => {
    d.forEach((video , i) => {
        let div = getVideoDiv(video.items)
        
        gridBox.appendChild(div)
        divs.unshift(div)
    })
})
.catch((e) => {
    console.log(e);
})

//filtering of videos based on input in search bar
const searchBar = document.getElementById("search")
searchBar.addEventListener("input",debounce((e) => {
    e.preventDefault()
    let title = e.target.value
    const newDivs = divs.filter((d) => d.id.toLowerCase().includes(title)).reverse()
    gridBox.innerHTML = "";
    newDivs.forEach((d) => gridBox.appendChild(d));
},500))

//debounce funtion

function debounce(fn , delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => { fn.apply(this,args) },delay)
    }
}
