import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Profile"
        subtext="Edit your profile and contact details."
        currentPage="Profile"
        currentHref="/workspace/profile"
      />
    </section>
  );
}
