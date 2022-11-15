const AOUT_KEY = "AIzaSyC3bHfBzJ2sEFMj7o-6BuovgnR2raNpdiA";

const STORAGE_KEY = "videoCache";

const videosCache = loadFromStorage(STORAGE_KEY) || {};

function getVideos(value) {
  setTimeout(() => {
    saveToStorage(STORAGE_KEY, delete videosCache);
    console.log("empty cache", videosCache);
  }, 100000);

  const key = Object.keys(videosCache).find(key => key.includes(value));
  if (key !== undefined) value = key;

  if (videosCache[value]) {
    console.log("videoCache", videosCache);
    console.log("get from cache");
    return Promise.resolve(videosCache[value]);
  }

  return axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${AOUT_KEY}&q=${value}`)
    .then(res => {
      console.log("Axios res is:", res);
      return res.data;
    })
    .then(res => {
      const videos = res.items.map(vid => {
        console.log(vid);
        return {
          value: value,
          videoImgUrl: vid.snippet.thumbnails.medium.url,
          channel: vid.snippet.channelTitle,
          id: vid.id.videoId,
          title: vid.snippet.title,
        };
      });
      videosCache[value] = videos;
      saveToStorage(STORAGE_KEY, videosCache);
      return videos;
    });
}
