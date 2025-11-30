import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type WidgetCardProps = {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  href?: string; // optional navigation target — if present the card becomes a link
  className?: string;
  ariaLabel?: string;
};

const WidgetCard = ({
  title,
  subtitle,
  footer,
  href,
  className = "",
  ariaLabel,
}: WidgetCardProps) => {
  const content = (
    <article
      aria-label={ariaLabel || title}
      className={`relative bg-white rounded-xl border p-4 flex flex-col overflow-hidden border-slate-200 ${className}`}
    >
      <span className="text-slate-500 text-sm">{title}</span>
      {subtitle ? (
        <p className="text-2xl font-bold text-slate-700 mt-4">{subtitle}</p>
      ) : null}

      {footer ? (
        <footer className="mt-4 text-xs text-slate-500">{footer}</footer>
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

export default function Page() {
  return (
    <section className="w-full h-[75vh]">
      <div className="p-2 mb-4">
        <h1 className="text-2xl font-bold">Workspace Overview</h1>
        <p className="mt-2 text-sm text-slate-700">
          Summary and dashboard widgets go here.
        </p>
      </div>
      <div className="w-full h-full text-slate-800">
        {/* Dashboard widgets will be implemented here in the future */}
        <div className="flex flex-row">
          <div className="flex-1 p-2">
            <WidgetCard
              title="Upcoming Appointments"
              subtitle="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <WidgetCard
              title="Upcoming Appointments"
              subtitle="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <WidgetCard
              title="Upcoming Appointments"
              subtitle="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <WidgetCard
              title="Upcoming Appointments"
              subtitle="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
