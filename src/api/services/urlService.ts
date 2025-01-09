import axiosInstance from "../axiosInstance";

export const fetchUserUrls = async () => {
  const response = await axiosInstance.get("/urls");
  return response.data;
};
