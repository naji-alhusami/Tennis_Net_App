import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface WrapperProps {
  className?: string;
  children: ReactNode;
}

const Wrapper = ({ className, children }: WrapperProps) => {
  return (
    <div className={cn("mx-auto", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
