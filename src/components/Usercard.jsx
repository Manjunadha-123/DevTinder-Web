import React from "react";

const Usercard = ({ user }) => {
  const { firstName, lastName, age, photoUrl, gender, about, skills } = user;
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
          <button className="btn btn-secondry">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
