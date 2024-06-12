import { useCallback, memo } from "react";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";

export type Management = "identity" | "tenant" | "setting" | "feature";
export type PermissionTracker = {
  name: string;
  isGranted: boolean;
};

type PermissionProps = {
  name: string;
  id: string;
  isGranted: boolean;
  onUpdate?: () => void;
  className?: string;
  disabled?: boolean;
};

function PermissionToggle({
  name,
  id,
  onUpdate,
  className,
  isGranted,
  disabled,
}: PermissionProps) {
  const onChangeEvent = useCallback(() => {
    onUpdate?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx("flex items-center space-x-2 pb-2", className)}>
      <Checkbox
        id={id}
        onCheckedChange={onChangeEvent}
        checked={isGranted}
        disabled={disabled}
      />
      <label htmlFor={id} className="text-sm  font-medium leading-none">
        {name}
      </label>
    </div>
  );
}

export const Permission = memo(PermissionToggle);
