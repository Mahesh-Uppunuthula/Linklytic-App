import { Fragment, useReducer, useState } from "react";
import Button from "../Components/Button/Button";
import { cn } from "../Utils/helpers";
import LinkFormModal from "../Components/Modals/LinkFormModal";

// type LinkStatusType = "ACTIVE" | "EXPIRED" | "DISABLED";

type Link = {
  name: string;
  longURL: string;
  shortenedURL: string;
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

const Headers = [
  { key: "item-no", label: "#" },
  { key: "name", label: "Name" },
  { key: "longURL", label: "Original Link" },
  { key: "shortenedURL", label: "Shortened Link" },
  { key: "createdAt", label: "Created" },
  { key: "updatedAt", label: "Last Modified" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

const dummyLinks: Link[] = [
  {
    name: "Insta link",
    longURL: "original link",
    shortenedURL: "shortened link",
    createdAt: "23 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
  {
    name: "Insta link 2",
    longURL: "original link 2",
    shortenedURL: "shortened link 2",
    createdAt: "24 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
  {
    name: "Insta link 3",
    longURL: "original link 3",
    shortenedURL: "shortened link 3",
    createdAt: "24 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
];

export type CREATE_LINK = "create-link";
export type UPDATE_LINK = "update-link";
export type DELETE_LINK = "delete-link";
export type LinkActions = CREATE_LINK | UPDATE_LINK | DELETE_LINK;
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
export type LinkReducerDispatch =
  | AddLinkDispatch
  | UpdateLinkDispatch
  | DeleteLinkDispatch;
function linkReducer(links: Link[], action: LinkReducerDispatch) {
  const { type, payload } = action;
  console.log({ links, action, payload });

  switch (type) {
    case "create-link":
      console.log("create-link");
      const newLink = createLink(payload.link);
      return [...links, newLink];
    case "delete-link":
      return links;
    // updatedLink();
    case "update-link":
      return links;
    // deleteLink();

    default:
      return links;
  }
}

function createLink(link: CreateLinkInput): Link {
  return {
    name: link.name,
    longURL: link.longURL,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    shortenedURL: `${link.name}-shortened`,
  };
}

function Dashboard() {
  const [links, dispatch] = useReducer(linkReducer, [...dummyLinks]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const closeAddLinkModal = () => setIsCreateLinkModalOpen(false);

  return (
    <Fragment>
      {isCreateLinkModalOpen && (
        <LinkFormModal
          closeModal={closeAddLinkModal}
          submitLink={(link) =>
            dispatch({
              type: isCreateMode ? "create-link" : "update-link",
              payload: { link },
            })
          }
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
              setIsCreateMode(true);
              setIsCreateLinkModalOpen(true);
            }}
          >
            Create Short URL
          </Button>
        </div>
        {/* Links Table */}
        <div className="w-full my-3 p-2">
          <table className="w-full ">
            <thead>
              <tr>
                {Headers.map(({ key, label }) => (
                  <th
                    key={key}
                    className="text-start text-gray-400 font-medium border border-gray-200 p-1"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {links.map((link, rowIndex) => (
                <tr key={`link-${rowIndex}`}>
                  {Headers.map(({ key }, columnIndex) => (
                    <td
                      key={`cell-${rowIndex}${columnIndex}`}
                      className={cn(
                        `border border-gray-200 p-1`,
                        rowIndex % 2 !== 0 ? "bg-default-light" : "bg-white"
                      )}
                    >
                      {key === "item-no"
                        ? rowIndex + 1
                        : link[key as keyof Link]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
