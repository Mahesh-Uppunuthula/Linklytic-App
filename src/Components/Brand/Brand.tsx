import { FiLink } from "react-icons/fi";
import Link from "../Button/Link";
type BrandProps = {
  size?: string | number;
};

function Brand({ size = "1.5rem", ...props }: BrandProps) {
  return (
    <div {...props}>
      <Link
        to={"/"}
        iconBefore={
          <FiLink
            id="brand-logo"
            size={size}
            strokeWidth={2.5}
            className="text-primary-regular "
          />
        }
      >
        Brand
      </Link>
    </div>
  );
}

export default Brand;
