import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="All Appointments"
        subtext="The list of all available appointments"
        currentPage="Appointments"
        currentHref="/workspace/appointments"
      />
    </section>
  );
}
