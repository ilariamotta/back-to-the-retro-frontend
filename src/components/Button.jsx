export default function Button({ text, className, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children || text}
    </button>
  );
}