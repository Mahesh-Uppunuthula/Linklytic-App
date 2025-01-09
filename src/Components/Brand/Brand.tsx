import { FiLink } from "react-icons/fi";
import Link from "../Button/Link";
import { PATH_CONSTANTS } from "../../routes/pathConstants";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
type BrandProps = {
  size?: string | number;
  showText?: boolean;
};

function Brand({ size = "1.5rem", showText = true, ...props }: BrandProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return (
    <div {...props}>
      <Link
        to={!isAuthenticated ? PATH_CONSTANTS.HOME : location.pathname}
        iconBefore={
          <FiLink
            id="brand-logo"
            size={size}
            strokeWidth={2.5}
            className="text-primary-regular "
          />
        }
      >
        {showText && "Brand"}
      </Link>
    </div>
  );
}

export default Brand;
