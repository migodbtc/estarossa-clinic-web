import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Audit Log"
        subtext="View audit trails and changes."
        currentPage="Audits"
        currentHref="/workspace/audits"
      />
    </section>
  );
}
