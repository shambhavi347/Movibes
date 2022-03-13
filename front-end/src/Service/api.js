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

export const setConverstion = async (data) => {
  try {
    await axios.post("/conversation", data);
  } catch (error) {
    console.log("error while calling convo api");
  }
};

export const getMessages = async () => {
  try {
    const res = await axios.get("/messages");
    return res;
  } catch (error) {
    console.log("error while calling message api");
  }
};
