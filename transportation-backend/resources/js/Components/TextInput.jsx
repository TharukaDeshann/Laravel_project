import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={`rounded-lg border-[#d48166]/20 bg-[#fefaf7] text-[#373a36] shadow-sm focus:border-[#d48166] focus:ring-[#d48166] dark:border-[#a86658]/30 dark:bg-[#2c2f31] dark:text-[#e6e2dd] dark:focus:border-[#a86658] dark:focus:ring-[#a86658] ${className}`}
      ref={localRef}
    />
  );
});
