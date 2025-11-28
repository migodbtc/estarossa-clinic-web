import { WorkspaceLayout } from "@/components/WorkspaceLayout";

export const metadata = {
  title: "Workspace",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}
