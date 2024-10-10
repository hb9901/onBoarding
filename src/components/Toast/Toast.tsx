import { useEffect, useState } from "react";
import useToastStore from "../../store/toast.store";

interface TtoastProps {
  id: string;
  content: string;
  delay: number;
}

function Toast({ id,content, delay }: TtoastProps) {
  const setToastClose = useToastStore((state) => state.setToastClose);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setToastClose(id);
    }, delay + 1000);

    const moveLeftTimer = setTimeout(() => {
      setIsOpen((prev) => !prev);
    });

    const moveRightTimer = setTimeout(() => {
      setIsOpen((prev) => !prev);
    }, delay + 500);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(moveLeftTimer);
      clearTimeout(moveRightTimer);
    };
  }, []);

  return (
    <li>
      <div
        className={`shadow-lg bg-white p-6 border rounded-lg w-[320px] transition flex items-center duration-500 text-sm ${
          isOpen ? "translate-x-[calc(100%+24px)]" : "!translate-x-0"
        }`}
      >
        <div className="grow flex flex-col">
          <strong className="font-semibold">{content}</strong>
        </div>
      </div>
    </li>
  );
}

export default Toast;
