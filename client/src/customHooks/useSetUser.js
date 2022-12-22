import { useDispatch } from "react-redux";
import { userActions } from "../redux/actions/user-actions";
import axios from "axios";

const useSetUser = async () => {
  const dispatch = useDispatch();

  const config = { headers: { "content-type": "application/json" } };

  try {
    const res = await axios.get("http://localhost:8080/api/users", {}, config);

    if (res.status === 204) {
      dispatch(userActions.setLogin(user)); //CREAR FUNCION DISPATCH PARA RESETEAR EL STATE.
      return false;
    }

    const user = res.data;
    dispatch(userActions.setLogin(user));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default useSetUser;