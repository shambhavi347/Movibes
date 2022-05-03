import axios from "axios";
const KEY = "AIzaSyCdLl92axnZTTzTD6IKYEiLlljYeKv9UZg";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
