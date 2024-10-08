import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const buttonVariant = cva(
  "border rounded transition hover:brightness-90 active:brightness-75",
  {
    variants: {
      intent: {
        primary: "bg-red-400 text-white",
        sub: "bg-white text-black",
      },
      size: {
        sm: "px-[15px] py-[7px] text-[15px] font-bold",
        md: "px-[21px] py-[9px] text-[17px] font-bold",
      },
      variant: {
        outline: "border-red-400 ",
        contained: "border-none",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      variant: "contained",
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariant>;

type ButtonProps = {} & ComponentProps<"button"> & ButtonVariant;

const Button = ({
  intent,
  size,
  variant,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={buttonVariant({ intent, size, variant })} {...props}>
      {children}
    </button>
  );
};

export default Button;
