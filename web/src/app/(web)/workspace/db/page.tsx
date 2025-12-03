import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="DB Console"
        subtext="Administration and quick queries."
        currentPage="DB"
        currentHref="/workspace/db"
      />
    </section>
  );
}
