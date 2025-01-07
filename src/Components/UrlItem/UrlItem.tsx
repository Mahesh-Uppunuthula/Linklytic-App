import React, { ComponentPropsWithRef } from "react";
import { LOCAL_APP_BASE_URL } from "../../constants";
import Button from "../Button/Button";
import { TbLocation, TbPencil } from "react-icons/tb";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "../Button/Link";

type UrlItem = ComponentPropsWithRef<"div"> & {
  name: string;
  shortenedUrlId: string;
  longUrl: string;
  lastModified: string;
};

const UrlItem: React.FC<UrlItem> = ({
  name,
  longUrl,
  shortenedUrlId,
  lastModified,
}) => {
  const shortUrl = `${LOCAL_APP_BASE_URL}/${shortenedUrlId}`;
  return (
    <div className="w-full h-fit flex flex-col gap-1 justify-start p-3 rounded-md border border-gray-200 shadow-md">
      <div className="p-2">
        {/* Short.Link / Name  & actions*/}
        <div className="flex justify-between place-items-center flex-nowrap gap-2">
          <div className="flex gap-1 justify-start place-items-center">
            <span
              title="click to copy to clipboard"
              className="font-medium text-primary-regular cursor-pointer"
            >
              Short.Link
            </span>
            <span className="text-sm text-neutral-400">or</span>
            <span className="font-medium text-neutral-800">{name}</span>
          </div>
          {/* action buttons */}
          <div className="flex gap-3 place-items-center">
            <Button appearance="primary" variant="soft" title="Edit Link">
              <AiOutlineEdit size={19} />
            </Button>
            <Link to={shortUrl} target="_blank" rel="noopener noreferrer">
              <Button appearance="primary" variant="soft" title="Visit Link">
                <TbLocation size={17} />
              </Button>
            </Link>
          </div>
        </div>
        {/* Long Link */}
        <div>
          <p className="text-sm text-neutral-600 text-pretty">{longUrl}</p>
        </div>
      </div>
      <div className="border border-gray-100" />
      {/* last modified date */}
      <div className="p-2 flex justify-start place-items-center">
        <p className="text-sm text-neutral-400">
          last modified: {lastModified}
        </p>
      </div>
    </div>
  );
};

export default UrlItem;
