import { ReactNode } from "react";
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router-dom";
import { cn } from "@lib/utils";

interface LinkProps extends ReactRouterLinkProps {
  children: ReactNode;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
}
function Link({
  to,
  children,
  iconBefore,
  iconAfter,
  className,
  ...rest
}: LinkProps) {
  const classNames = cn(
    {
      // default styles
      "inline-flex gap-1 place-items-center": true,
    },
    className
  );
  return (
    <ReactRouterLink {...rest} to={to} className={classNames}>
      {iconBefore && <div>{iconBefore}</div>}
      <div>{children}</div>
      {iconAfter && <div>{iconAfter}</div>}
    </ReactRouterLink>
  );
}

export default Link;
