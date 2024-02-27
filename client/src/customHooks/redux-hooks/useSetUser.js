import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import useFetch from "../useFetch";

const useSetUser = () => {
  const dispatch = useDispatch();
  
  const { data: user, error, status } = useFetch("http://localhost:8080/api/users", null);
  
  // if (error || status === 401) {
  //   return dispatch(userActions.setLogin(null));
  // }
  
  dispatch(setUser(user));
}

export default useSetUser;
