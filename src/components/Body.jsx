import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    if(!userData){
      fetchUser();
    }
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
