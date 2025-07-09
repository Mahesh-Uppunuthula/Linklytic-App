import { memo } from "react";
import { BaseItemType, DraggableItemData, ElementID } from "../../types/global";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "../../libs/helpers";
import { LuClock, LuText, LuTrash2, LuType } from "react-icons/lu";
import { Bs123, BsCalendar2Date } from "react-icons/bs";
import { TbToggleRightFilled } from "react-icons/tb";
import { IoCheckboxOutline } from "react-icons/io5";

type DraggableItemProps = {
  item: BaseItemType;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const data: DraggableItemData = {
    id: item.id,
    from: item.parentType,
    item: item,
  };
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: item.id,
    data: data,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        `p-2 bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 border rounded-md active:outline outline-2 active:outline-primary-regular `,
        {
          "opacity-75 outline outline-2 outline-primary-regular": isDragging,
        }
      )}
    >
      {/* {isDragging ? "" : <Element />} */}
      <Element item={item} />
    </div>
  );
};

const Icon = ({ id }: { id: ElementID }) => {
  switch (id) {
    case "single-line-input":
      return <LuType size={21} />;
    case "multi-line-input":
      return <LuText size={21} />;
    case "number-input":
      return <Bs123 size={24} />;
    case "date-input":
      return <BsCalendar2Date size={21} />;
    case "time-input":
      return <LuClock size={21} />;
    case "radio-button":
      return <TbToggleRightFilled size={21} />;
    case "checkbox":
      return <IoCheckboxOutline size={21} />;
    default:
      return <LuTrash2 size={21} />;
  }
};

const Element = ({ item }: { item: BaseItemType }) => {
  return (
    <div className="w-full h-fit text-base p-2 flex gap-2 place-items-center">
      <span>
        <Icon id={item.id} />
      </span>
      <span>{item.name}</span>
    </div>
  );
};

export default memo(DraggableItem);
