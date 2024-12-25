import { Fragment, useState } from "react";
import Button from "../Components/Button/Button";
import { cn } from "../Utils/helpers";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../Components/Modal/Modal";
import TextField from "../Components/TextField/TextField";
import Field from "../Components/Field/Field";

// type LinkStatusType = "ACTIVE" | "EXPIRED" | "DISABLED";

type LinkType = {
  name: string;
  originalLink: string;
  shortenedLink: string;
  createdAt: string;
  updatedAt: string;
  // expiresAt: string;
  // status: LinkStatusType;
  // tag: string;
};

type CreateLinkForm = {
  name: string;
  originalLink: string;
};

type CreateLinkFormFields = keyof CreateLinkForm;

const Headers = [
  { key: "item-no", label: "#" },
  { key: "name", label: "Name" },
  { key: "originalLink", label: "Original Link" },
  { key: "shortenedLink", label: "Shortened Link" },
  { key: "createdAt", label: "Created" },
  { key: "updatedAt", label: "Last Modified" },
];

const dummyLinks: LinkType[] = [
  {
    name: "Insta link",
    originalLink: "original link",
    shortenedLink: "shortened link",
    createdAt: "23 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
  {
    name: "Insta link 2",
    originalLink: "original link 2",
    shortenedLink: "shortened link 2",
    createdAt: "24 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
  {
    name: "Insta link 3",
    originalLink: "original link 3",
    shortenedLink: "shortened link 3",
    createdAt: "24 Dec, 2024",
    updatedAt: "25 Dec, 2024",
  },
];
function Dashboard() {
  const [links] = useState<LinkType[]>(dummyLinks);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const [createLinkForm, setCreateLinkForm] = useState<CreateLinkForm>({
    name: "",
    originalLink: "",
  });

  const handleCloseModal = () => {
    setIsCreateLinkModalOpen(false);
    setCreateLinkForm({ name: "", originalLink: "", });
  };

  // TODO fix this on change function
  const handleOnChangeFormData = (
    field: CreateLinkFormFields,
    value: string
  ) => {
    setCreateLinkForm((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Fragment>
      {isCreateLinkModalOpen && (
        <Modal size="medium" onClose={handleCloseModal}>
          <ModalHeader>
            <ModalTitle title="Add New Link" />
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 place-items-start">
                <Field name="Name" isRequired />
                <TextField
                  autoFocus
                  type="text"
                  placeholder="Example: My Top Picks - Travel Destinations"
                  maxLength={52}
                  value={createLinkForm.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChangeFormData("name", event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 place-items-start">
                <Field name="Your Long URL" isRequired />
                <TextField
                  iconBefore={
                    <span className="text-success-regular pointer-events-none border-r-2 pr-3">
                      https://
                    </span>
                  }
                  type="text"
                  placeholder="super-long-url.com/shorten-it"
                  autoCorrect="off"
                  value={createLinkForm.originalLink}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChangeFormData("originalLink", event.target.value);
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCloseModal}>Discard</Button>
              <Button appearance="primary" bolded>
                Shorten URL
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      )}
      {/* Dashboard Page Container */}
      <div className="py-2 px-3 w-full">
        {/* Heading */}
        <div className="flex justify-between place-items-center">
          <div className="text-gray-600 font-medium text-lg">Your URLs</div>
          <Button
            appearance="primary"
            bolded
            onClick={() => setIsCreateLinkModalOpen(true)}
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
                        : link[key as keyof LinkType]}
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
