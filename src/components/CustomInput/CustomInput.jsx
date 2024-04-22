export default function CustomInput({
  type,
  name,
  value,
  onChange,
  id,
  label,
  labelClassName = "block text-sm font-medium leading-6 text-gray-900",
  ...rest
}) {
  return (
    <>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    </>
  );
}
