import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fecthConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!connections) fecthConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1 className="flex justify-center my-10 text-2xl">No connections found</h1>;
  return (
    <div className="text-center my-10">
      <h2 className="text-bold text-3xl ">Connections</h2>
      {connections.map((connection,index) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
            <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto border-2" key={_id || index}>
                <div>
                    <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full object-cover"/>
                </div>
                <div className="text-left mx-6">
                    <h1 className="font-bold text-xl">{firstName}</h1>
                    {age && gender && <p>{`Age: ${age} Gender:  ${gender}`}</p>}
                    <p>{about}</p>
                </div>
            </div>
        )
      })}
    </div>
  );
};

export default Connections;
