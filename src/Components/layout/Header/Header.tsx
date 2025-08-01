import { NavLink, useNavigate, To } from "react-router-dom";
import { cn } from "@lib/utils";
import Brand from "../../ui/Brand/Brand";
import { PATH_CONSTANTS } from "../../../routes/pathConstants";
import UserMenu from "../../ui/Menu/UserMenu";
import useAuth from "../../../hooks/useAuth";
import Button from "../../ui/Button/Button";

type NavBarItemType = {
  to: To;
  label: string;
  key: React.Key;
};

const UNAUTHENTICATED_USER_NAVBAR_ITEMS: NavBarItemType[] = [
  {
    to: PATH_CONSTANTS.HOME,
    label: "Home",
    key: "home",
  },
  {
    to: PATH_CONSTANTS.ABOUT,
    label: "About",
    key: "about",
  },
];

const AUTHENTICATED_USER_NAVBAR_ITEMS: NavBarItemType[] = [];

const styles = {
  active:
    "text-primary-dark font-medium underline decoration-primary-regular underline-offset-2 decoration-2",
  inActive: "text-gray-500 hover:text-gray-600 active:text-primary-dark",
};

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <header
      className={cn(
        isAuthenticated
          ? "flex justify-between place-items-center mx-2 mb-2"
          : "flex justify-around place-items-center"
      )}
    >
      <Brand />
      <nav className="flex justify-center place-items-center gap-5 text-sm">
        {(isAuthenticated
          ? AUTHENTICATED_USER_NAVBAR_ITEMS
          : UNAUTHENTICATED_USER_NAVBAR_ITEMS
        ).map(({ label, to, key }) => (
          <NavLink
            key={key}
            to={to}
            className={({ isActive }) =>
              cn(` ${isActive ? styles.active : styles.inActive} `)
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <>
        {isAuthenticated ? (
          <div>
            <UserMenu />
          </div>
        ) : (
          <div className="inline-flex gap-4 place-items-center ">
            {/* login and sign up buttons go here */}
            <Button
              className="min-w-4 min-h-4"
              appearance="primary"
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button
              appearance="primary"
              variant="solid"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        )}
      </>
    </header>
  );
}
