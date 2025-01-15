import React, { ComponentPropsWithRef, useState } from "react";
import Button from "../Button/Button";
import { TbCopy, TbCopyCheck, TbLocation } from "react-icons/tb";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "../Button/Link";

export type URL_ITEM_ACTIONS = "edit-url" | "delete-url";

type UrlItem = ComponentPropsWithRef<"div"> & {
  id: string;
  name: string;
  shortenedUrlId: string;
  longUrl: string;
  lastModified: string;
  onAction: (action: URL_ITEM_ACTIONS, id: string) => void;
};

const UrlItem: React.FC<UrlItem> = ({
  id,
  name,
  longUrl,
  shortenedUrlId,
  lastModified,
  onAction = () => {},
}) => {
  const shortUrl = `${
    import.meta.env.VITE_LOCAL_API_BASE_URL
  }/${shortenedUrlId}`;

  const [isContentCopied, setIsContentCopied] = useState(false);

  const handleCopyClick = async () => {
    if (isContentCopied) return;
    setTimeout(() => {
      setIsContentCopied(false);
    }, 3000);
    await navigator.clipboard.writeText(shortUrl).then((value) => {
      console.log({ value });
      setIsContentCopied(true);
    });
  };
  return (
    <div className="w-full h-fit flex flex-col gap-1 justify-start p-3 rounded-md border border-gray-200 shadow-md hover:shadow-lg hover:border-primary-regular hover:duration-500 ">
      <div className="p-2">
        {/* Short.Link / Name  & actions*/}
        <div className="flex justify-between place-items-center flex-nowrap gap-2">
          <div className="flex gap-1 justify-start place-items-center">
            <span
              title={isContentCopied ? "Copied" : "Copy Link"}
              className="font-medium text-primary-regular cursor-pointer flex gap-1 place-items-center group"
              onClick={handleCopyClick}
            >
              <span className="group-hover:block hidden">
                {isContentCopied ? (
                  <TbCopyCheck size={15} />
                ) : (
                  <TbCopy size={15} />
                )}
              </span>
              <span>Short.Link</span>
            </span>
            <span className="text-sm text-neutral-400">or</span>
            <span className="font-medium text-neutral-800">{name}</span>
          </div>
          {/* action buttons */}
          <div className="flex gap-3 place-items-center">
            <Button
              appearance="primary"
              variant="soft"
              title="Edit Link"
              onClick={() => onAction("edit-url", id)}
            >
              <AiOutlineEdit size={19} />
            </Button>
            <Button
              appearance="primary"
              variant="soft"
              title="Delete Link"
              onClick={() => onAction("delete-url", id)}
            >
              <AiOutlineDelete size={19} />
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
