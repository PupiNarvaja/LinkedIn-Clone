import React from "react";
import useFetch from "../../customHooks/useFetch";
import Conditional from "../../utils/Conditional";
import Loader from "../../utils/loader/Loader";
import { useParams } from "react-router-dom";
import UpdateProfilePicture from "./UpdateProfilePicture";

const Profile = () => {
  const params = useParams();
  const userUrl = params.user;
  const { data: user, isLoading, error } = useFetch(`http://localhost:8080/api/users/${userUrl}`, []);

  return (
    <>
      <Conditional props={[
        isLoading, <div className="mt-8"><Loader /></div>,
        error, <div>{error?.response.data.error}</div>,// Corregir.
        user, <div>{user.url}</div>]}
      />

      <UpdateProfilePicture />
    </>
  )
};

export default Profile;
