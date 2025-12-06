"use client";
import Card, { CardContent } from "@/components/ui/Card";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { useMockUser } from "@/contexts/MockUserContext";
import { Role } from "@/types/db/enums";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();

  const PatientRecords = () => {
    return (
      <div className="grid grid-cols-12 gap-4 h-full mb-8">
        {/* Main column */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className="h-16 py-2 flex justify-center align-middle text-center">
            <CardContent>Search bar</CardContent>
          </Card>
          <Card className="h-32 py-2">
            <CardContent>Hello!</CardContent>
          </Card>
          <Card className="h-32 py-2">
            <CardContent>Hello!</CardContent>
          </Card>
          <Card className="h-32 py-2">
            <CardContent>Hello!</CardContent>
          </Card>
          <Card className="h-32 py-2">
            <CardContent>Hello!</CardContent>
          </Card>
          <Card className="h-16 py-2 flex justify-center align-middle text-center">
            <CardContent>Pagination controls</CardContent>
          </Card>
        </div>
        {/* Side column */}
        <div className="col-span-4 h-full">
          <Card className="w-full h-full py-2">
            <CardContent className="">
              Content of the clicked card goes here
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const MedicalRecords = () => {
    return <div>Hello! You are a doctor/nurse!</div>;
  };

  const AdminRecords = () => {
    return <div>Hello! You are an admin!</div>;
  };

  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Medical Records"
        subtext="View and create medical records."
        currentPage="Records"
        currentHref="/workspace/records"
      />
      <main className="flex-1 p-2 row h-auto ">
        {mockUserCtx.role == ("patient" as Role) ? (
          <PatientRecords />
        ) : mockUserCtx.role == ("doctor" as Role) ? (
          <MedicalRecords />
        ) : mockUserCtx.role == ("admin" as Role) ? (
          <AdminRecords />
        ) : (
          <div>Unknown role!</div>
        )}
      </main>
    </section>
  );
}
