import React from "react";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "../../libs/helpers";
import Label from "../ui/Miscellaneous/Label";
import { BuiltInElementsType, ColumnType } from "../../types/global";
import DraggableItem from "./DraggableItem";
type ComponentsLibraryProps = {
  column: ColumnType;
  items: BuiltInElementsType;
};

const ComponentsLibrary: React.FC<ComponentsLibraryProps> = ({
  column,
  items,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.type,
  });

  return (
    <div ref={setNodeRef} className={cn(`w-full h-full p-1 overflow-hidden `)}>
      <div className="w-full h-full overflow-auto flex flex-col gap-3 place-items-center ">
        {Object.entries(items).map(([category, elements]) => {
          return (
            <div
              key={category}
              className="w-full h-fit px-2 flex flex-col gap-2"
            >
              <Label name={category} capitalize />
              <>
                {Object.entries(elements).map(([, item]) => (
                  <DraggableItem key={item.id} item={item} />
                ))}
              </>
            </div>
          );
        })}
      </div>
      {/* </Show> */}
    </div>
  );
};

export default ComponentsLibrary;
