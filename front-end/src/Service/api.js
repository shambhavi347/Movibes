import axios from "axios";

// const URL = "http://localhost:7000";

// export const Registeration = async (data) => {
//   try {
//     await axios.post("/reg", data);
//   } catch (error) {
//     console.log("error ", error);
//   }
// };

export const getFriends = async () => {
  try {
    let respone = await axios.get("/get-friends");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const getFriends1 = async () => {
  try {
    let respone = await axios.get("/get-friends1");
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
    let respone = await axios.delete("/delete-user");
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const deleteFriend = async (data) => {
  try {
    let respone = await axios.post("/delete-friend", data);
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const sendRequest = async (data) => {
  try {
    let response = await axios.post("/accept-request", data);
    return response.data;
  } catch (error) {
    console.log("error ", error);
  }
};

// export const deletePref = async () => {
//   try {
//     let respone = await axios.delete("/delete-pref");
//     return respone.data;
//   } catch (error) {
//     console.log("error ", error);
//   }
// };

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

export const cancelFrn = async (data) => {
  try {
    await axios.post("/cancel-frn", data);
  } catch (error) {
    console.log("error while calling convo api");
  }
};

export const getProfile = async (data) => {
  try {
    let respone = await axios.post("/get-profile", data);
    return respone.data;
  } catch (error) {
    console.log("error ", error);
  }
};

// export const getSuggested = async (data) => {
//   try {
//     await axios.get("/suggeted-frn", data);
//   } catch (error) {
//     console.log("error while calling convo api");
//   }
// };
