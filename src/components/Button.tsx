function Button({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: "white" | "green" | "green-fill";
  onClick: () => void;
}) {
  return (
    <button
      className={`px-12 py-2 border-4 font-body button-${variant} transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
