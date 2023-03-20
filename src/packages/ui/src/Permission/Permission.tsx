import classNames from 'classnames';
import { Checkbox } from '../Shared/Checkbox';

type PermissonProps = {
  name: string;
  id: string;
  isGranted: boolean;
  onUpdate: () => void;
  className?: string;
}

export function Permission({name, id, isGranted, onUpdate, className}: PermissonProps) {
  return (
    <div className={classNames("flex items-center space-x-2 pb-2", className)}>
      <Checkbox id={id} checked={isGranted} onChange={onUpdate} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  )
};
