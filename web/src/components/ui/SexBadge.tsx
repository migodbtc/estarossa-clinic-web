import { Sex } from "@/types/db/enums";
import {
  faMars,
  faVenus,
  faGenderless,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SexBadge = ({ sex }: { sex: Sex | string }) => {
  let color = "bg-slate-200 text-slate-600";
  let icon = faGenderless;
  let label = "Other";

  if (sex.toLowerCase() === "male") {
    color = "bg-blue-200 text-blue-700";
    icon = faMars;
    label = "Male";
  } else if (sex.toLowerCase() === "female") {
    color = "bg-pink-200 text-pink-700";
    icon = faVenus;
    label = "Female";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      <FontAwesomeIcon icon={icon} className="text-xs" />
      {label}
    </span>
  );
};

export default SexBadge;
