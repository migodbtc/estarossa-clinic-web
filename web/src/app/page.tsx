import { redirect } from "next/navigation";

export default function Page() {
  // Redirect root to the landing page
  redirect("/landing");
}
