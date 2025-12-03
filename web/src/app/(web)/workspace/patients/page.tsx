import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Patients"
        subtext="Patient directory and quick view."
        currentPage="Patients"
        currentHref="/workspace/patients"
      />
    </section>
  );
}
