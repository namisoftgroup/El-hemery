import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setClientData } from "../redux/slices/clientData";
import axiosInstance from "../utils/axiosInstance";
import useGetProfile from "./useGetProfile";

export default function useAuth() {
  const dispatch = useDispatch();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      removeCookie("token", { path: "/" });
    }
  }, [token, removeCookie]);

  const { data: profile, isLoading, error } = useGetProfile(!!token);

  useEffect(() => {
    if (profile) {
      dispatch(setClientData(profile));
    }
  }, [profile, dispatch]);

  return {
    loading: isLoading,
    isAuthed: !!profile && !error,
    profile,
  };
}
