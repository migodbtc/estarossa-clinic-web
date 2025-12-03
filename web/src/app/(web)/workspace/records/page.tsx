import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Medical Records"
        subtext="View and create medical records."
        currentPage="Records"
        currentHref="/workspace/records"
      />
    </section>
  );
}
