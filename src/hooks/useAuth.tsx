import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// TODO the isAuthenticated state ain't persisting fix it
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be provided within an AuthProvider");
  return context;
};

export default useAuth;
