import Toast from "../components/Toast";
import useToastStore from "../store/toast.store";

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <>
      {children}
      <ul className="fixed bottom-6 right-6 grid grid-cols-1 gap-y-3">
        {toasts.length > 0 &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              content={toast.content}
              delay={toast.delay}
            />
          ))}
      </ul>
    </>
  );
};

export default ToastProvider;
