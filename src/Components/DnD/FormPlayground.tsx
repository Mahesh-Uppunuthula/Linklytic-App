import React from "react";

import { useDndContext, useDroppable } from "@dnd-kit/core";
import { cn } from "../../libs/helpers";
import LabeledBorder from "../ui/Miscellaneous/LabeledBorder";
import SectionMessage from "../ui/SectionMessage/SectionMessage";
import Label from "../ui/Miscellaneous/Label";
import TextField from "../ui/TextField/TextField";
import Show from "../utils/Show";
import {
  ColumnType,
  DraggableItemData,
  FormElementType,
} from "../../types/global";
import SortabbleItem from "./SortableItem";
import { AnimatePresence, motion } from "framer-motion";

const dottedBackdrop =
  "bg-[#FAF9F6] bg-[radial-gradient(#00000030_1.5px,transparent_1px)] bg-[length:20px_20px] bg-[-19px_-19px]";

type FormPlaygroundProps = {
  column: ColumnType;
  items: FormElementType[];
};

export const FormPlayground: React.FC<FormPlaygroundProps> = ({
  column,
  items,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.type,
  });

  const { active, over } = useDndContext();

  const overCurrentColumn = over?.id === column.type;

  const showFormBody = () => {
    if (!active || !active.data.current) return true;

    const activeItem = active.data.current as DraggableItemData;

    return activeItem.from === "dynamic" && items.length > 0;
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-auto p-2">
      {/* form header */}
      <div className="w-full h-fit">
        <LabeledBorder title="Header">
          <div className="mt-1 mb-2">
            <SectionMessage
              title="Form title and description will not be editable by the user"
              appearance="info"
            />
          </div>
          <div className="w-full h-fit flex flex-col p-1">
            <div className="w-full">
              <Label name="Title" />
              <TextField
                className="text-sm font-medium"
                type="text"
                value={"Employee details"}
                placeholder="Form Title"
              />
            </div>
            <div className="w-full">
              <Label name="Description" />
              <TextField
                className="text-sm text-neutral-600"
                type="text"
                // value="lorem ipsum dolor sit amet"
                // min={"2025-06-12"}
                // maxLength={200}
                minLength={10}
                maxLength={20}
                placeholder="Form Title"
              />
            </div>
          </div>
        </LabeledBorder>
      </div>
      {/* form body */}
      <div className="w-full h-fit">
        <LabeledBorder
          title="Body"
          appearance={!showFormBody() ? "primary" : "default"}
          className={cn("bg-neutral-50/90", {
            "bg-blue-50/30": overCurrentColumn,
          })}
        >
          <div ref={setNodeRef} className={cn(`w-full h-full`)}>
            <AnimatePresence>
              <Show
                key={"form-body-show"}
                when={showFormBody()}
                fallback={<FormBodyFallback />}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }}
                  className={cn(
                    `w-full h-full min-h-40 p-1 flex flex-col gap-2 place-items-center`
                  )}
                >
                  <ItemsList items={items} column={column} />
                </motion.div>
              </Show>
            </AnimatePresence>
          </div>
        </LabeledBorder>
      </div>
      {/* form footer */}
      <div className="w-full h-fit">
        <LabeledBorder title="Actions">
          <div>user actions</div>
        </LabeledBorder>
      </div>
    </div>
  );
};

const ItemsList = ({
  items,
  column,
}: {
  items: FormElementType[];
  column: ColumnType;
}) => {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          `w-full h-full flex justify-center place-items-center text-neutral-600 text-sm`,
          dottedBackdrop
        )}
      >
        Add items to the form
      </div>
    );
  }
  return (
    <div
      className="w-full h-full flex flex-col gap-3"
      // layoutId="sortable-items"
    >
      {items.map((item) => (
        <SortabbleItem key={item.id} item={item} columnName={column.type} />
      ))}
    </div>
  );
};

const FormBodyFallback = () => {
  return (
    <div className="min-h-40 w-full h-full">
      <span className="w-full h-full flex justify-center place-items-center text-sm text-blue-400 font-medium">
        Drop form elements here
      </span>
    </div>
  );
};

export default FormPlayground;
