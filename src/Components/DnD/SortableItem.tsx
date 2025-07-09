import { ClassValue } from "clsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../libs/helpers";
import { memo, useCallback } from "react";
import { LuGripVertical, LuTrash2 } from "react-icons/lu";
import Label from "../ui/Miscellaneous/Label";
import { FormElementType } from "../../types/global";
import { motion } from "framer-motion";

import {
  useActiveFormElement,
  useFormBuilderElementsStore,
} from "../../store/FormBuilderStore";

const SortabbleItem = ({
  item,
  columnName,
}: {
  item: FormElementType;
  columnName: string;
  className?: ClassValue;
}) => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: item.id,
      data: {
        from: columnName,
        item: item,
      },
    });

  const deleteFormElement = useFormBuilderElementsStore(
    (state) => state.deleteElement
  );

  const activeFormElementId = useActiveFormElement(
    (state) => state.activeFormElementId
  );
  const setActiveFormElementId = useActiveFormElement(
    (state) => state.setActiveFormElementId
  );

  const showOptions = activeFormElementId && item.id === activeFormElementId;
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      deleteFormElement(item.id);
      setActiveFormElementId(null);
    },
    [deleteFormElement, item.id, setActiveFormElementId]
  );

  return (
    <motion.div
      layout="position"
      exit={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      ref={setNodeRef}
      className={cn(
        `w-full flex flex-col justify-between place-items-center rounded relative hover:bg-primary-light/20 border-2 border-neutral-200 hover:border-primary-light`,
        {
          "bg-primary-light/20 border-none": showOptions,
        }
      )}
      onClick={() => setActiveFormElementId(item.id)}
    >
      {showOptions && (
        <motion.div className="w-fit absolute top-[-40px] self-end p-2 border-primary-regular flex gap-2 justify-start place-items-center bg-primary-regular text-white rounded-t-md [&>button:hover]:bg-white [&>button:hover]:text-primary-regular [&>button]:p-1 [&>button]:rounded">
          <button
            style={style}
            {...attributes}
            {...listeners}
            className={cn(`cursor-grab acive:cursor-grabbing`)}
          >
            <LuGripVertical />
          </button>
          <button onClick={handleDelete}>
            <LuTrash2 />
          </button>
        </motion.div>
      )}
      <div
        className={cn(
          `w-full h-full p-2 flex flex-col gap-2  rounded-b-md rounded-l-md`,
          { "border-2 border-primary-regular": showOptions }
        )}
      >
        <Label
          name={item.fieldName.length > 0 ? item.fieldName : "Field Name"}
          capitalize={item.capitalize}
          required={item.required}
        />
        <div className="w-full min-h-[40px] rounded bg-white shadow flex place-items-center justify-start">
          <span className="p-2 text-neutral-600">{item.placeholder}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(SortabbleItem);
