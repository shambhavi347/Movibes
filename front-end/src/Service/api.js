import axios from "axios";

// const URL = "http://localhost:7000";

export const getFriends = async () => {
  try {
    let respone = await axios.get("/get-friends");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};
