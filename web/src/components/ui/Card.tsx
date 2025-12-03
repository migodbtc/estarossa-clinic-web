import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative bg-white rounded-xl border flex flex-col overflow-hidden border-slate-300 text-slate-700 ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

// semantic wrappers for subcomponents such as header content and footer

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<SectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <header
      className={`flex items-center justify-between px-4 py-4 border-b border-b-slate-300 ${className}`}
    >
      {children}
    </header>
  );
};

export const CardContent: React.FC<SectionProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mt-4 px-4 py-2 flex-1${className}`}>{children}</div>;
};

export const CardFooter: React.FC<SectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <footer className={`mt-4 text-sm  px-4 py-4 ${className}`}>
      {children}
    </footer>
  );
};
