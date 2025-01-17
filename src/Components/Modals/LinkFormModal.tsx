import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../Modal/Modal";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import Field from "../Field/Field";
import { useState } from "react";
import { TLinkBase } from "../../types/global";

type TCreateLinkInput = TLinkBase;
type TEditLinkInput = Pick<TLinkBase, "name">;

export type TLinkFormSubmitData = TCreateLinkInput | TEditLinkInput;

type LinkFormModalProps = {
  isEditMode: boolean;
  link: TLinkBase | undefined;
  submitLink: (link: TLinkFormSubmitData) => void;
  closeModal: () => void;
} & (
  | { isEditMode: true; submitLink: (link: TEditLinkInput) => void }
  | { isEditMode: false; submitLink: (link: TCreateLinkInput) => void }
);

type CreateLinkFormFields = keyof TCreateLinkInput;
type CreateLinkFormFieldsType = TCreateLinkInput[keyof TCreateLinkInput];

const LinkFormModal: React.FC<LinkFormModalProps> = ({
  isEditMode,
  link,
  submitLink,
  closeModal,
}) => {
  const [createLinkForm, setCreateLinkForm] = useState<TLinkBase>({
    name: link?.name ?? "",
    longUrl: link?.longUrl ?? "",
  });

  const handleOnChangeFormData = (
    field: CreateLinkFormFields,
    value: CreateLinkFormFieldsType
  ) => {
    setCreateLinkForm((prevFormData: TCreateLinkInput) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  function handleCloseModal() {
    setCreateLinkForm({ name: "", longUrl: "" });
    closeModal();
  }

  function handleSubmit() {
    submitLink(createLinkForm);
    handleCloseModal();
  }
  return (
    <Modal size="medium" onClose={handleCloseModal}>
      <ModalHeader>
        <ModalTitle title={isEditMode ? "Edit Link" : "Add New Link"} />
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
              disabled={isEditMode}
              iconBefore={
                <span className="text-success-regular pointer-events-none border-r-2 pr-3">
                  https://
                </span>
              }
              type="url"
              placeholder="super-long-url.com/shorten-it"
              autoCorrect="off"
              value={createLinkForm.longUrl}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChangeFormData("longUrl", event.target.value);
              }}
              // errorMessage="Enter valid URL"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-4">
          <Button onClick={handleCloseModal}>Discard</Button>
          <Button appearance="primary" bolded onClick={handleSubmit}>
            {isEditMode ? "Update" : "Shorten URL"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default LinkFormModal;
