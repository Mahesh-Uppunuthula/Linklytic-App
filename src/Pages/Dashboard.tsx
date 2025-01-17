import { Fragment, useState } from "react";
import Button from "../components/Button/Button";
import LinkFormModal, {
  TLinkFormSubmitData,
} from "../components/Modals/LinkFormModal";
import UrlItem, { TUrlAction } from "../components/UrlItem/UrlItem";
import {
  useCreateUrl,
  useDeleteUrl,
  useUpdateUrl,
  useUrls,
} from "../hooks/useUrls";
import { TLinkBase } from "../types/global";

// type LinkStatusType = "ACTIVE" | "EXPIRED" | "DISABLED";

export type Link = TLinkBase & {
  _id: string;
  shortUrlID: string;
  createdAt: string;
  updatedAt: string;
  // expiresAt: string;
  // status: LinkStatusType;
  // tag: string;
};

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUrlId, setEditUrlId] = useState("");

  const { isPending, isFetched, error, data: userUrlsData } = useUrls();

  const {
    mutate: createUrl,
    isPending: isCreationPending,
    error: creationError,
  } = useCreateUrl();

  const { mutate: updateUrl, error: updationError } = useUpdateUrl();

  const {
    mutate: deleteUserUrl,
    isPending: isDeletionPending,
    error: deletionError,
  } = useDeleteUrl();

  const links = isFetched ? userUrlsData?.data.links : [];

  const closeModal = () => {
    setEditUrlId("");
    setIsModalOpen(false);
  };

  const handleUrlItemAction = ({ type, payload }: TUrlAction) => {
    switch (type) {
      case "edit":
        setEditUrlId(payload.id);
        setIsModalOpen(true);
        break;
      case "delete":
        deleteUserUrl({ id: payload.id });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (link: TLinkFormSubmitData) => {
    if (editUrlId.trim().length) {
      updateUrl({ id: editUrlId, name: link.name });
    } else {
      if ("longUrl" in link) {
        createUrl({ name: link.name, longUrl: link.longUrl });
      } else {
        console.error("invald input");
      }
    }
  };

  // add a page loader
  if (isPending || isCreationPending || isDeletionPending)
    return (
      <div className="w-full h-full flex justify-center place-items-center text-neutral-400">
        Loading...
      </div>
    );

  if (error || creationError || updationError || deletionError)
    return (
      <div>{`error has occurred ${
        error || creationError || updationError || deletionError
      }`}</div>
    );

  return (
    <Fragment>
      {isModalOpen && (
        <LinkFormModal
          isEditMode={Boolean(editUrlId.trim().length)}
          link={
            links?.find((link: Link) => link._id === editUrlId) ??
            ({ name: "", longUrl: "" } as TLinkBase)
          }
          closeModal={closeModal}
          submitLink={handleSubmit}
        />
      )}
      {/* Dashboard Page Container */}
      <div className="py-2 px-3 w-full">
        {/* Heading */}
        <div className="flex justify-between place-items-center">
          <div className="text-gray-600 font-medium text-lg">Your URLs</div>
          <Button
            appearance="primary"
            bolded
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create Short URL
          </Button>
        </div>
        <div className="w-full h-full my-5 grid grid-cols-2 gap-4">
          {links?.map((link: Link) => (
            <UrlItem
              key={link._id}
              id={link._id}
              name={link.name}
              longUrl={link.longUrl}
              lastModified={link.updatedAt}
              shortenedUrlId={link.shortUrlID}
              onAction={handleUrlItemAction}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;

/**
 * 
 * 
 * To get faivcon of the passed domain for example dribble
 * https://www.google.com/s2/favicons?domain=dribbble.com&sz=128
 * 
 * An error occurred creating the short URL
 * The URL has not been shortened, possible errors:
 * Check if the domain is correct
 * Check if the site is online
 * Check the address bars and punctuation
 * The URL may be being used for spam
 * The URL may have been blocked
 * The URL may have been reported
 * The URL was recently shortened
 * The URL is not allowed
 * You shortened many URLs in a short time
 * 
 * 
 * {
    "data": [
      {
        "url": "https:\/\/dribbbl.com\/shots\/15436288-Mobile-Responsive-Table",
        "active": true,
        "hash": "257ywclu",
        "no_affiliate": false,
        "host": "dribbbl.com",
        "scheme": "https",
        "aliases": [
            {
                "domain": "tinyurl.com",
                "alias": "3kaxf5cv",
                "is_main": true,
                "is_archived": false,
                "is_terminated": false,
                "is_deleted": false,
                "no_affiliate": false,
                "stats": {
                    "enabled": false,
                    "public": false
                },
                "tags": [],
                "created_at": "2024-12-25T19:36:16+00:00",
                "expires_at": null,
                "description": null,
                "tiny_url": "https:\/\/tinyurl.com\/3kaxf5cv",
                "affiliates": false,
                "read_only": true
            }
        ]
      }
 */
