import React, { useState, useEffect } from "react";
import NavBar2 from "./NavBar2";
import { profilepic } from "./Image/Images";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { deleteUser } from "./Service/api";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({
    name: "",
    age: "",
    gender: "",
  });
  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const profileDeleted = () => {
    let path = "/reg";
    navigate(path);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteUser();
      window.alert(data.message);
      profileDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  //call user Profile
  const callProfilePage = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res, error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      routeChange();
    }
  };

  //edit user Profile
  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { name, age, gender } = update;
    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        gender,
      }),
    });
    const reason = await res.json();
    if (res.status === 422) {
      window.alert(reason.error);
    } else {
      callProfilePage();
      setEdit(false);
    }
  };
  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <>
      <NavBar2 />
      <div className="box">
        <h1 className="hi">Profile Page</h1>
        <div className="page">
          <div className="container1">
            <div className="pic">
              <img
                className="abtImg"
                src={
                  userData.photo ? `./uploads/${userData.photo}` : profilepic
                }
                alt="profile pic"
              />
            </div>
            <button onClick={() => setEdit(true)} className="editBtn">
              Edit Profile
            </button>
            <button className="editBtn" onClick={handleClickOpen}>
              Delete Profile
            </button>
          </div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="DialogT">
              Do you really want to leave us ? 😥💔
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="DialogC">
                Your account details will be permanently deleted!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="closeBtn"
                onClick={handleClose}
                color="primary"
              >
                Close
              </button>
              <button
                className="closeBtn"
                onClick={handleDelete}
                color="primary"
                autoFocus
              >
                Yes
              </button>
            </DialogActions>
          </Dialog>
          <div className="details">
            {edit ? (
              <>
                <form action="POST" onSubmit={updateUser}>
                  <p className="pDeets">
                    Name:
                    <input
                      type="text"
                      name="name"
                      placeholder={userData.name}
                      className="edits"
                      onChange={handleChange}
                      value={update.name}
                    />
                  </p>

                  <p className="pDeets">
                    Gender:
                    {/* <span className="items">{userData.gender}</span> */}
                    <div className="editsGroup">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleChange}
                      />
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleChange}
                      />
                      Female
                      <input
                        type="radio"
                        name="gender"
                        value="transgender"
                        onChange={handleChange}
                      />
                      Transgender
                    </div>
                  </p>
                  <p className="pDeets">
                    Age:
                    <input
                      type="text"
                      name="age"
                      className="edits"
                      placeholder={userData.age}
                      value={update.age}
                      onChange={handleChange}
                    />
                  </p>
                  <button className="editBtn">Save</button>
                  <button className="editBtn" onClick={() => setEdit(false)}>
                    Cancle
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="pDeets">
                  Name:<span className="items">{userData.name}</span> <br />
                </p>
                <p className="pDeets">
                  Username:<span className="items">{userData.username}</span>
                </p>
                <p className="pDeets">
                  Email ID:
                  <span className="items">{userData.email}</span>
                </p>
                <p className="pDeets">
                  Gender:<span className="items">{userData.gender}</span>
                  Age:<span className="items">{userData.age}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
