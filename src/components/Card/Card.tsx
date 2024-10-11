import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="border border-solid border-red-400 rounded-lg px-[20px] py-[20px] lg:min-w-[600px]">
      {children}
    </div>
  );
};

export default Card;
