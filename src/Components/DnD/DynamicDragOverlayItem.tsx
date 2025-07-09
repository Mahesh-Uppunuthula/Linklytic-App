import { memo } from "react";

type DynamicDragOverlayItemProps = {
  name: string;
};

const DynamicDragOverlayItem: React.FC<DynamicDragOverlayItemProps> = ({
  name,
}) => {
  return (
    <div className="w-full min-w-52 h-fit p-2 rounded flex justify-center place-items-center bg-neutral-100 outline outliine-2 outline-neutral-300 shadow-md cursor-grabbing">
      <span className="text-neutral-700 font-medium ">{name}</span>
    </div>
  );
};

export default memo(DynamicDragOverlayItem);
