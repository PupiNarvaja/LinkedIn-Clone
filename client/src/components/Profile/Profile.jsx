import React from "react";
import useFetch from "../../customHooks/useFetch";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import UpdateProfilePicture from "./UpdateProfilePicture";

const Profile = () => {
  const params = useParams();
  const userUrl = params.user;
  const { data: user, isLoading, error } = useFetch(`http://localhost:8080/api/users/${userUrl}`, []);

  return (
    <>
      {isLoading && <div className="mt-8"><Loader /></div>}
      {error && <div>{error?.response.data.error}</div>}
      {user && <div>{user.url}</div>}
      <UpdateProfilePicture />
    </>
  )
};

export default Profile;
