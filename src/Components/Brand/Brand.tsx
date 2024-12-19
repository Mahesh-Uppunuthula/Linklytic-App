import { FiLink } from "react-icons/fi";
import Link from "../Button/Link";
import { PATH_CONSTANTS } from "../../Routes/pathConstants";
type BrandProps = {
  size?: string | number;
  showText?: boolean;
};

function Brand({ size = "1.5rem", showText = true, ...props }: BrandProps) {
  return (
    <div {...props}>
      <Link
        to={PATH_CONSTANTS.HOME}
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
