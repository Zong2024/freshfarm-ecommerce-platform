import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ActionFullButtonProps } from "./ActionFullButton.types";

export const ActionFullButton = ({
  isLoading,
  children,
  className,
  ...props
}: ActionFullButtonProps) => {
  return (
    <Button
      className={cn(
        "h-13 w-full rounded-sm font-bold text-white shadow-none",
        isLoading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : children}
    </Button>
  );
};
