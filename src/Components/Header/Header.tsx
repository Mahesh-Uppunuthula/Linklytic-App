import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../Utils/helpers";
import Brand from "../Brand/Brand";
import Button from "../Button/Button";

const NavBarItems = [
  {
    to: "",
    label: "Home",
    key: "home",
  },
  {
    to: "/about",
    label: "About",
    key: "about",
  },
];

const styles = {
  active:
    "text-primary-dark font-medium underline decoration-primary-regular underline-offset-2 decoration-2",
  inActive: "text-gray-500 hover:text-gray-600 active:text-primary-dark",
};

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-around place-items-center">
      <Brand />
      <nav className="flex justify-center place-items-center gap-5 text-sm">
        {NavBarItems.map(({ label, to, key }) => (
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
      {/* login and sign up buttons go here */}
      <div className="inline-flex gap-4 place-items-center ">
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
    </header>
  );
}
