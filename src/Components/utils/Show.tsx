import { memo } from "react";

type ShowProps = {
  when: boolean;
  children: React.ReactNode;
  fallback: React.ReactNode;
};
const Show: React.FC<ShowProps> = ({ when, children, fallback }) => {
  return <div className="w-full h-full">{when ? children : fallback}</div>;
};

export default memo(Show);
