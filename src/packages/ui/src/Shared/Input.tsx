export type InputProps = {
  name: string;
  [x: string]: any;
};

export const Input = (props: InputProps) => {
  return (
    <div>
      <label htmlFor={props.name} className="text-sm block mb-1 font-medium">
        {props.name}
      </label>
      <input
        className="bg-gray-100 border rounded py-1 px-3 block w-full"
        {...props}
      />
    </div>
  );
};