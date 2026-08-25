function Button({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-12 py-2 border-4 font-body button-${variant} cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
