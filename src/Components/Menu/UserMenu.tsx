import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PATH_CONSTANTS } from "../../routes/pathConstants";

const UserMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      title="Mahi312"
      className="flex gap-2 place-items-center text-gray-400 cursor-pointer"
      onClick={() => {
        navigate(PATH_CONSTANTS.HOME);
        logout();
      }}
    >
      <div className="w-8 h-8 overflow-hidden rounded-3xl">
        <img
          src="../../../assets/images/male-profile-image.webp"
          alt="male profile picture"
        />
      </div>
      <span>Mahi312</span>
    </div>
  );
};

export default UserMenu;
