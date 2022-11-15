"use strict";
function init() {
  const videos = getVideos("trance").then(res => {
    renderVideos(res);
    document.querySelector(".loader").hidden = true;
  });
}

document.getElementById("search").addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});

function onSubmit(ev) {
  ev.preventDefault();
  let searchValue = document.querySelector("#search").value;
  document.querySelector(".loader").hidden = false;
  const videos = getVideos(searchValue).then(res => {
    renderVideos(res);
    document.querySelector(".loader").hidden = true;
  });
  // console.log(videos);
  // console.log(searchValue);
}

function renderVideos(res) {
  const videos = res.map((vid, i) => {
    if (i === 0) {
      let bigVid = ` <iframe  src="https://www.youtube.com/embed/${vid.id}"> </iframe>`;
      document.querySelector(".main-video").innerHTML = bigVid;
    }
    return `<div onclick="onVidClick('${vid.id}')" class="video-container">
    <div class="video-box">
    <img src="${vid.videoImgUrl}"/>
    </div>
    <div class="content-wrapper">
    <div class="channel">${vid.channel}</div>
    <div class="video-title">${vid.title}</div>
    </div>
    </div>`;
  });

  document.querySelector(".section-left").innerHTML = videos.join("");
}

function onVidClick(vidId) {
  console.log("vidid", vidId);
  let bigVid = ` <iframe  src="https://www.youtube.com/embed/${vidId}"> </iframe>`;
  document.querySelector(".main-video").innerHTML = bigVid;
}
