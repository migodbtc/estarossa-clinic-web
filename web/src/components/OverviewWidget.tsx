import Link from "next/link";

type OverviewWidgetProps = {
  title: string;
  main?: string;
  footer?: React.ReactNode;
  href?: string; // optional navigation target — if present the card becomes a link
  className?: string;
  ariaLabel?: string;
};

export const OverviewWidget = ({
  title,
  main,
  footer,
  href,
  className = "",
  ariaLabel,
}: OverviewWidgetProps) => {
  const content = (
    <article
      aria-label={ariaLabel || title}
      className={`relative h-[20vh] bg-white rounded-xl border flex flex-col overflow-hidden border-slate-300 ${className}`}
    >
      <span className="text-slate-700 text-md px-4 py-2 ">{title}</span>
      {main ? (
        <p className="flex-1 text-2xl font-bold text-slate-700 px-4 justify-left items-center flex">
          {main}
        </p>
      ) : null}

      {footer ? (
        <footer className="mt-4 text-xs text-slate-700 px-4 py-2 ">
          {footer}
        </footer>
      ) : null}
    </article>
  );

  return href ? (
    <Link
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded"
    >
      {content}
    </Link>
  ) : (
    content
  );
};

export default OverviewWidget;
