export function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      className="border p-2 rounded w-full"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  );
}
