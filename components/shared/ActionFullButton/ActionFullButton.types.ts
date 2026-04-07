import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export interface ActionFullButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
}
