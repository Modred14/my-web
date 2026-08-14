// /src/components/GradientDivider.js
export default function GradientDivider({ className = "", height = "1px" }) {
  return (
    <div
      className={`w-full bg-gradient-to-r from-transparent via-neutral-400 to-transparent ${className}`}
      style={{ height }}
    />
  );
}