import React from "react";
import { useForm } from "react-hook-form";

export default function Form({
  defaultValues,
  children,
  onSubmit,
  onCancel,
}: any): JSX.Element {
  const { handleSubmit, register, reset } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
      <div className="space-x-4 mt-8 float-right">
        <button
          onClick={() => {
            reset();
            onCancel();
          }}
          className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
}
