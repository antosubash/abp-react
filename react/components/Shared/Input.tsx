export default function Input({ register, name, displayName, ...rest }: any) {
  return (
    <div className="p-2">
      <label
        htmlFor="name"
        className="text-sm text-gray-700 block mb-1 font-medium"
      >
        {displayName}
      </label>
      <div>
        <input
          {...register(name)}
          {...rest}
          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />
      </div>
    </div>
  );
}
