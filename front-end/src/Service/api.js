import axios from "axios";

// const URL = "http://localhost:7000";

export const getFriends = async () => {
  try {
    let respone = await axios.get("/get-friends");
    console.log("hi axios");
    console.log(respone);
    return respone;
  } catch (error) {
    console.log("error ", error);
  }
};
