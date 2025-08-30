const Button = ({ label }: { label: string }) => {
  return (
    <button
      className="inline-flex justify-center items-center gap-2 px-12 py-4 text-[#FAFAFA] font-poppins text-[16px] font-medium leading-6 bg-black rounded-full transition-colors hover:bg-white hover:text-black"
    >
      {label}
    </button>
  );
};

export default Button;
