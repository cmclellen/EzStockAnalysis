"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel: string;
};

function SubmitButton({ children, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-primary-container text-on-primary-container px-2 py-1 rounded-lg font-bold tracking-wider w-full md:w-auto duration-300"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
