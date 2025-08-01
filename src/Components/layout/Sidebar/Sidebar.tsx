import React, { ReactElement } from "react";
import Brand from "../../ui/Brand/Brand";
import { PATH_CONSTANTS } from "../../../constants";
import { LuLayoutDashboard, LuLibrary, LuPlus } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { cn } from "@lib/utils";
import { TbForms } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import Button from "../../ui/Button/Button";
import Link from "../../ui/Button/Link";

/**
 * TODO
 * Fix Path constants issues in all files and routes
 *
 * Add pages for links and account
 *
 * Link exisiting create link modal with plus button
 *
 * Figure out how to redirect user to new.domain.com
 *
 * Add the new domain thing and save details in cookies and figure out the entire login logout thing both on client and server
 * use redis and react query
 *
 * Add charts to the frontend
 *
 */

type Option = {
  key: string;
  position: "top" | "bottom";
  component: ReactElement;
  label?: string;
  link: string;
};

const OPTIONS: Option[] = [
  {
    key: "dashboard",
    position: "top",
    component: (
      <div>
        <Link to={PATH_CONSTANTS.PRIVATE.DASHBOARD}>
          <LuLayoutDashboard size={24} />
        </Link>
      </div>
    ),
    link: PATH_CONSTANTS.PRIVATE.DASHBOARD,
    label: "Dashboard",
  },
  {
    key: "all-links",
    position: "top",
    component: (
      <div>
        <Link to={PATH_CONSTANTS.PRIVATE.LINKS}>
          <LuLibrary size={24} />
        </Link>
      </div>
    ),
    link: PATH_CONSTANTS.PRIVATE.LINKS,
    label: "Links",
  },
  {
    key: "form-builder",
    position: "top",
    component: (
      <div>
        <Link to={PATH_CONSTANTS.PRIVATE.FORM_BUILDER}>
          <TbForms size={24} />
        </Link>
      </div>
    ),
    link: PATH_CONSTANTS.PRIVATE.FORM_BUILDER,
    label: "Form Builder",
  },
  {
    key: "account",
    position: "top",
    component: (
      <div>
        <Link to={PATH_CONSTANTS.PRIVATE.ACCOUNT}>
          <MdOutlineAccountCircle size={24} />
        </Link>
      </div>
    ),
    link: PATH_CONSTANTS.PRIVATE.ACCOUNT,
    label: "Account",
  },
];

const TopOptions = () => {
  return OPTIONS.map((option) => (
    <NavLink key={option.key} to={option.link}>
      {({ isActive }) => (
        <>
          <div
            data-tooltip-id={option.key}
            data-tooltip-content={option.label}
            data-tooltip-position="left"
            key={`sidebar-option-${option.key}`}
            className={cn(`flex flex-col place-items-center`, {
              "text-neutral-500": !isActive,
            })}
          >
            <div className={cn({ "text-primary-regular": isActive })}>
              {option.component}
            </div>
            {/* <span
            className={cn(`text-xs font-medium whitespace-nowrap`, {
              "text-neutral-800": isActive,
            })}
          >
            {option.label}
          </span> */}
          </div>
          <Tooltip id={option.key} place="left" />
        </>
      )}
    </NavLink>
  ));
};

const BottomOptions = () => {
  return (
    <div>
      {/* <div className="bg-primary-regular text-white rounded flex justify-center place-items-center p-2">
        <LuPlus />
      </div> */}
      <Button
        data-tooltip-id="create-new-link"
        data-tooltip-content={"Create a new link"}
        appearance="primary"
        className="aspect-square"
      >
        <LuPlus size={17} strokeWidth={3} />
      </Button>
      <Tooltip id="create-new-link" place="left" />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full">
      {/* container */}
      <div className="w-full h-full p-5 px-4 border border-b-0 border-t-0 flex flex-col place-items-center">
        {/* brand */}
        <div>
          <Brand />
        </div>
        <div className="w-fit h-full mt-10 mb-3 flex flex-col justify-between place-items-center">
          {/* top section */}
          <div className="w-fit h-full flex flex-col gap-6 place-items-center">
            <TopOptions />
          </div>
          {/* bottom section */}
          <div className="w-fit h-full flex flex-col justify-end place-items-center">
            <BottomOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
