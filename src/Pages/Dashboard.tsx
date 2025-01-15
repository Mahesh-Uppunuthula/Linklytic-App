import { Fragment, useState } from "react";
import Button from "../components/Button/Button";
import LinkFormModal from "../components/Modals/LinkFormModal";
import UrlItem, { URL_ITEM_ACTIONS } from "../components/UrlItem/UrlItem";
import {
  useDeleteUrl,
  useUrlMutation,
  useUrls,
  useUrlUpdate,
} from "../hooks/useUrls";

// type LinkStatusType = "ACTIVE" | "EXPIRED" | "DISABLED";

export type Link = {
  _id: string;
  name: string;
  longURL: string;
  shortUrlID: string;
  createdAt: string;
  updatedAt: string;
  // expiresAt: string;
  // status: LinkStatusType;
  // tag: string;
};

export type CreateLinkInput = {
  name: string;
  longURL: string;
};

// const Headers = [
//   { key: "item-no", label: "#" },
//   { key: "name", label: "Name" },
//   { key: "longURL", label: "Original Link" },
//   { key: "shortenedURL", label: "Shortened Link" },
//   { key: "createdAt", label: "Created" },
//   { key: "updatedAt", label: "Last Modified" },
//   { key: "edit", label: "Edit" },
//   { key: "delete", label: "Delete" },
// ];

// const dummyLinks: Link[] = [
//   {
//     _id: "Insta link 1",
//     name: "Insta link",
//     longURL: "original link",
//     shortenedURL: "shortened link",
//     createdAt: "23 Dec, 2024",
//     updatedAt: "25 Dec, 2024",
//   },
//   {
//     _id: "Insta link 2",
//     name: "Insta link 2",
//     longURL: "original link 2",
//     shortenedURL: "shortened link 2",
//     createdAt: "24 Dec, 2024",
//     updatedAt: "25 Dec, 2024",
//   },
//   {
//     _id: "Insta link 3",
//     name: "Insta link 3",
//     longURL: "original link 3",
//     shortenedURL: "shortened link 3",
//     createdAt: "24 Dec, 2024",
//     updatedAt: "25 Dec, 2024",
//   },
// ];

export type CREATE_LINK = "create-link";
export type UPDATE_LINK = "update-link";
export type DELETE_LINK = "delete-link";
export type POPULATE_LINKS = "populate-links";
export type LinkActions =
  | CREATE_LINK
  | UPDATE_LINK
  | DELETE_LINK
  | POPULATE_LINKS;

export type AddLinkDispatch = {
  type: CREATE_LINK;
  payload: { link: CreateLinkInput };
};
export type UpdateLinkDispatch = {
  type: UPDATE_LINK;
  payload: { link: CreateLinkInput };
};
export type DeleteLinkDispatch = {
  type: DELETE_LINK;
  payload: { id: number };
};
export type PopulateLinksDispatch = {
  type: POPULATE_LINKS;
  payload: { links: Link[] };
};
export type LinkReducerDispatch =
  | AddLinkDispatch
  | UpdateLinkDispatch
  | DeleteLinkDispatch
  | PopulateLinksDispatch;

// function linkReducer(links: Link[], action: LinkReducerDispatch) {
//   const { type, payload } = action;
//   console.log({ links, action, payload });

//   switch (type) {
//     case "create-link": {
//       console.log("create-link");
//       const newLink = createLink(payload.link);
//       return [...links, newLink];
//     }
//     case "delete-link":
//       return links;
//     // updatedLink();
//     case "update-link":
//       return links;
//     // deleteLink();
//     case "populate-links":
//       return payload.links;

//     default:
//       return links;
//   }
// }

// function createLink(link: CreateLinkInput): Link {
//   return {
//     _id: `id-${link.name}`,
//     name: link.name,
//     longURL: link.longURL,
//     createdAt: Date.now().toString(),
//     updatedAt: Date.now().toString(),
//     shortenedURL: `${link.name}-shortened`,
//   };
// }

/**
 *
 * TODO
 *
 * - Create env variable for setting the base url for axios
 * - Create API folder for handling all the api calls
 * - Create useLinks hook which gives {isLoading, isPending, data, error ...} = useLinks();
 */

function Dashboard() {
  const [isCreateOrUpdateLinkModalOpen, setIsCreateOrUpdateLinkModalOpen] =
    useState(false);
  const [editUrlId, setEditUrlId] = useState("");

  const { isPending, isFetched, error, data: userUrlsData } = useUrls();
  const {
    mutate: createUrl,
    isPending: isCreationPending,
    error: creationError,
  } = useUrlMutation();

  const { mutate: updateUrl, error: updationError } = useUrlUpdate();

  const {
    mutate: deleteUserUrl,
    isPending: isDeletionPending,
    error: deletionError,
  } = useDeleteUrl();

  const links = isFetched ? userUrlsData?.data.links : [];

  const closeAddLinkModal = () => {
    setEditUrlId("");
    setIsCreateOrUpdateLinkModalOpen(false);
  };

  const handleUrlItemAction = (action: URL_ITEM_ACTIONS, id: string) => {
    switch (action) {
      case "edit-url":
        setEditUrlId(id);
        setIsCreateOrUpdateLinkModalOpen(true);
        break;
      case "delete-url":
        deleteUserUrl({ id });
        break;

      default:
        break;
    }
  };

  const handleCreateOrUpdate = (link: CreateLinkInput) => {
    console.log({ link });
    if (editUrlId.trim().length) {
      updateUrl({ id: editUrlId, name: link.name });
    } else {
      createUrl({ name: link.name, longUrl: link.longURL });
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
      {isCreateOrUpdateLinkModalOpen && (
        <LinkFormModal
          isEditMode={editUrlId.trim().length > 0}
          link={
            links?.find((link: Link) => link._id === editUrlId) ??
            ({ name: "", longURL: "" } as CreateLinkInput)
          }
          closeModal={closeAddLinkModal}
          submitLink={handleCreateOrUpdate}
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
              setIsCreateOrUpdateLinkModalOpen(true);
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
              longUrl={link.longURL}
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
