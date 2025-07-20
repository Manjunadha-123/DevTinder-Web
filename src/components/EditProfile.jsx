import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, age, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoUrl</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="PhotoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="About your self"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
