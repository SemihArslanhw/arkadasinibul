import { API } from "./BaseAxiosCall";
import { toast } from "react-toastify";


export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await API.post("auth/login", userCredential);
    toast.success("Giriş Başarılı");
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    toast.error("Giriş Başarısız Tekrar Deneyiniz");
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};