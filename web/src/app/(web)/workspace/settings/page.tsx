import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Settings"
        subtext="Application preferences and features."
        currentPage="Settings"
        currentHref="/workspace/settings"
      />
    </section>
  );
}
