import { type ReactNode, useState } from "react";

export default function Box({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`box ${className}`}>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
