"use client";
import Card, { CardContent } from "@/components/ui/Card";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { useMockUser } from "@/contexts/MockUserContext";
import { Role } from "@/types/db/enums";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();

  const PatientAppointments = () => {
    return (
      <div className="grid grid-cols-12 gap-4 h-full mb-8">
        {/* Main column */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className="h-40">
            <CardContent className="w-full h-full flex flex-col justify-end align-bottom ">
              <h3 className="font-bold text-3xl">Your Appointments Today</h3>
              <span className="mb-2">
                You have X appointments to attend to.
              </span>
            </CardContent>
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
              <Card className="h-48 p-2">Calendar goes here</Card>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">8</div>
                    <span className="text-xs text-slate-500 italic">
                      Total appointments this month (January)
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">6</div>
                    <span className="text-xs text-slate-500 italic">
                      Finished appointments this month
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">3</div>
                    <span className="text-xs text-slate-500 italic">
                      Upcoming appointments
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">22</div>
                    <span className="text-xs text-slate-500 italic">
                      Total appointments overall
                    </span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const MedicalAppointments = () => {
    return (
      <div className="grid grid-cols-12 gap-4 h-full mb-8">
        {/* Main column */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className="h-40">
            <CardContent className="w-full h-full flex flex-col justify-end align-bottom ">
              <h3 className="font-bold text-3xl">Your Appointments Today</h3>
              <span className="mb-2">
                You have X appointments to attend to.
              </span>
            </CardContent>
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
              <Card className="h-48 p-2">Calendar goes here</Card>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">8</div>
                    <span className="text-xs text-slate-500 italic">
                      Total appointments this month (January)
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">6</div>
                    <span className="text-xs text-slate-500 italic">
                      Finished appointments this month
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">3</div>
                    <span className="text-xs text-slate-500 italic">
                      Upcoming appointments
                    </span>
                  </div>
                </Card>
                <Card className="h-32">
                  <div className="h-full py-2 px-4 flex flex-col justify-center align-middle">
                    <div className="font-bold text-2xl">22</div>
                    <span className="text-xs text-slate-500 italic">
                      Total appointments overall
                    </span>
                  </div>
                </Card>
              </div>
              <button className=" w-full h-auto mt-4 px-4 py-2 text-slate-700 border-2 border-slate-200 rounded-xl flex flex-row justify-center items-center gap-4 transform hover:scale-105 hover:cursor-pointer transition">
                <FontAwesomeIcon icon={faList} />{" "}
                <span>See all appointment history</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const AdminAppointments = () => {
    return <div>Hello! You are an admin!</div>;
  };

  return (
    <section className="w-full h-20">
      <WorkspaceTitle
        title="All Appointments"
        subtext="The list of all available appointments"
        currentPage="Appointments"
        currentHref="/workspace/appointments"
      />
      <main className="flex-1 p-2 row h-auto ">
        {mockUserCtx.role == ("patient" as Role) ? (
          <PatientAppointments />
        ) : mockUserCtx.role == ("doctor" as Role) ? (
          <MedicalAppointments />
        ) : mockUserCtx.role == ("admin" as Role) ? (
          <AdminAppointments />
        ) : (
          <div>Unknown role!</div>
        )}
      </main>
    </section>
  );
}
