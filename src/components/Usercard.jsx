import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const Usercard = ({ user }) => {
  const { _id, firstName, lastName, age, photoUrl, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {}
  };

  return (
    <div className="card bg-blue-400 text-black w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName}</h2>
        {age && gender && (
          <div className="flex  ">
            <p>{`Age: ${age}`}</p>
            <p>{`Gender: ${gender}`}</p>
          </div>
        )}
        <p>{about}</p>
        <div className="card-actions flex justify-around">
          <button className="btn btn-secondry" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
          <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
