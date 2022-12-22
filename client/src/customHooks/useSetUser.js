import { useDispatch } from "react-redux";
import { userActions } from "../redux/actions/user-actions";
import useFetch from "./useFetch";

const useSetUser = () => {
  // If user refreshes the site, it's info will be requested.
  // If an error occurs or session expires, it will redirect to "/Login".

  const dispatch = useDispatch();
  
  const { data: user, error, status } = useFetch("http://localhost:8080/api/users", null);
  
  if (error || status === 401) {
    return dispatch(userActions.setLogin(null));
  }
  
  dispatch(userActions.setLogin(user));
}

export default useSetUser;
