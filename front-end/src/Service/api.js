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

export const deleteUser = async () => {
  try {
    let respone = await axios.delete("/delete");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getRequests = async () => {
  try {
    let respone = await axios.get("/get-requests");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getPending = async () => {
  try {
    let respone = await axios.get("/get-pending");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const acceptFrn = async (data) => {
  try {
    await axios.post("/accept-frn", data);
  } catch (error) {
    console.log("error while calling convo api");
  }
};

export const rejectFrn = async (data) => {
  try {
    await axios.post("/reject-frn", data);
  } catch (error) {
    console.log("error while calling convo api");
  }
};

// export const getSuggested = async (data) => {
//   try {
//     await axios.get("/suggeted-frn", data);
//   } catch (error) {
//     console.log("error while calling convo api");
//   }
// };
