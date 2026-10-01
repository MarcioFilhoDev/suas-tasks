import { useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export default function Input({ title, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-[#344840]">
        {title}
      </label>
      <input
        {...props}
        id={inputId}
        className="min-h-12 w-full rounded-lg border border-[#d9e1da] bg-[#fbfcfa] px-3.5 text-[15px] text-[#1c302b] placeholder:text-[#9aa59d] transition-shadow focus:border-[#668078] focus:ring-4 focus:ring-[#668078]/15"
      />
    </div>
  );
}
