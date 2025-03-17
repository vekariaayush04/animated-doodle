async function getVideos() {
    const response = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=30")
    const jsonData = await response.json()
    return jsonData.data.data
}

function createVideoDiv(video) {
    const gridBox = document.getElementById("gridBox")
    const vDiv = document.createElement("a")
    const imgDiv = getThumbnail(video.snippet.thumbnails.medium.url)
    const descDiv = getDescription(video.snippet.title , video.snippet.channelTitle , video.statistics.viewCount)
    vDiv.href = `https://www.youtube.com/watch?v=${video.id}`
    vDiv.target = "_blank"
    vDiv.appendChild(imgDiv)
    vDiv.appendChild(descDiv)
    gridBox.appendChild(vDiv)
    
    console.log(video);
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

getVideos()
.then((d) => {
    d.forEach((video , i) => {
        createVideoDiv(video.items)
    })
})
.catch((e) => {

})