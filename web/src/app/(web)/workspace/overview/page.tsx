"use client";

import Card, {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import OverviewWidget from "@/components/OverviewWidget";
import {
  faArrowRight,
  faClipboardList,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { useMockUser } from "@/contexts/MockUserContext";
import { Role } from "@/types/db/enums";
import { mockAppointments, mockMedicalRecords } from "@/constants/mock";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();

  function PatientOverview() {
    // Current data uses mock instead of live SQL data
    // Reconfigure once auth is running properly
    const patientId = mockUserCtx?.auth_id;
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const todaysAppointments = mockAppointments.filter(
      (appt) =>
        appt.patient_id === patientId &&
        appt.status === "scheduled" &&
        appt.date_time.slice(0, 10) === todayStr
    );

    return (
      <>
        <div className="flex flex-row">
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Scheduled Appointments Today"
              // Count of appointments for the patient where date_time is today and status is 'scheduled'.
              main={String(todaysAppointments.length)}
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Upcoming Appointments"
              // Count of future appointments for the patient with status = scheduled
              main="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Your Medical Records"
              // Count of medical records for the patient
              main="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Prescribed Medications"
              // Count of unique medications prescribed
              main="3"
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 p-2 min-h-[50vh]">
          <Card className="col-span-2 row-span-2">
            <CardHeader>
              <h2 className="font-bold">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                {"  "}Appointments for Today
              </h2>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 py-8 h-full">
                  <div className="h-full flex flex-col justify-center items-center">
                    <FontAwesomeIcon
                      icon={faMinus}
                      size="2x"
                      className="mb-2"
                    />
                    <span>No appointments scheduled for today.</span>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {todaysAppointments.map((appt) => (
                    <li
                      key={appt.appointment_id}
                      className="py-2 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="mr-2 text-blue-500"
                      />
                      <span className="font-medium">
                        {new Date(appt.date_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {appt.visit_reason || "No reason specified"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-1 row-span-2">
            <CardHeader>
              <h2 className="font-bold">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                {"  "}Your Medical Records
              </h2>
            </CardHeader>
            <CardContent>Testing as well</CardContent>
            <CardFooter>View all medical records</CardFooter>
          </Card>
          <Card className="col-span-1 row-span-2">
            <CardHeader>
              <h2 className="font-bold">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                {"  "}Your Quick Actions
              </h2>
            </CardHeader>
            <CardContent>Testing as well</CardContent>
          </Card>
        </div>
      </>
    );
  }

  function MedicalRoleOverview() {
    // Get current user
    const staffId = mockUserCtx?.auth_id;
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // Upcoming appointments assigned to this staff
    const upcomingAppointments = mockAppointments.filter(
      (appt) =>
        appt.staff_id === staffId &&
        appt.status === "scheduled" &&
        appt.date_time > today.toISOString()
    );

    // Appointments for today assigned to this staff
    const todaysAppointments = mockAppointments.filter(
      (appt) =>
        appt.staff_id === staffId &&
        appt.status === "scheduled" &&
        appt.date_time.slice(0, 10) === todayStr
    );

    // Medical records handled by this staff
    const handledRecords = mockMedicalRecords.filter(
      (rec) => rec.staff_id === staffId
    );

    // Count of unique patients seen by this staff
    const uniquePatients = Array.from(
      new Set(handledRecords.map((rec) => rec.patient_id))
    ).length;

    // Count of completed appointments
    const completedAppointments = mockAppointments.filter(
      (appt) => appt.staff_id === staffId && appt.status === "completed"
    ).length;

    return (
      <>
        <div className="flex flex-row">
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Upcoming Appointments"
              // Count of upcoming appointments for the staff
              main={String(upcomingAppointments.length)}
              href="/workspace/appointments"
              footer={
                <span>
                  View all appointments <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Patients Seen"
              // Count of unique patients handled by staff
              main={String(uniquePatients)}
              href="/workspace/patients"
              footer={
                <span>
                  View all patients <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Completed Appointments"
              // Count of completed appointments for staff
              main={String(completedAppointments)}
              href="/workspace/appointments"
              footer={
                <span>
                  View completed <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Medical Records Handled"
              // Count of medical records handled by staff
              main={String(handledRecords.length)}
              href="/workspace/records"
              footer={
                <span>
                  View records <FontAwesomeIcon icon={faArrowRight} />
                </span>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 p-2 min-h-[50vh]">
          <Card className="col-span-2 row-span-2">
            <CardHeader>
              <h2 className="font-bold">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                {"  "}Appointments for Today
              </h2>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 py-8 h-full">
                  <div className="h-full flex flex-col justify-center items-center">
                    <FontAwesomeIcon
                      icon={faMinus}
                      size="2x"
                      className="mb-2"
                    />
                    <span>No appointments scheduled for today.</span>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {todaysAppointments.map((appt) => (
                    <li
                      key={appt.appointment_id}
                      className="py-2 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="mr-2 text-blue-500"
                      />
                      <span className="font-medium">
                        {new Date(appt.date_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {appt.visit_reason || "No reason specified"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-2 row-span-2">
            <CardHeader>
              <h2 className="font-bold">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                {"  "}Quick Actions
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="h-24 border-2 border-dashed border-slate-300 text-slate-700 px-4 py-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer transform hover:scale-105 transition">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  Add Medical Record
                </button>
                <button className="h-24 border-2 border-dashed border-slate-300 text-slate-700 px-4 py-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer transform hover:scale-105 transition">
                  <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                  Schedule Appointment
                </button>
                <button className="h-24 border-2 border-dashed border-slate-300 text-slate-700 px-4 py-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer transform hover:scale-105 transition">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  View Patient List
                </button>
                <button className="h-24 border-2 border-dashed border-slate-300 text-slate-700 px-4 py-2 rounded-xl flex flex-col justify-center items-center hover:cursor-pointer transform hover:scale-105 transition">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  See All Records
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  function AdminOverview() {}

  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Workspace Overview"
        subtext="Summary and dashboard widgets go here."
        currentPage="Overview"
        currentHref="/workspace/overview"
      />
      <main className="w-full">
        {mockUserCtx.role == ("patient" as Role) ? (
          <PatientOverview />
        ) : mockUserCtx.role == ("doctor" as Role) ? (
          <MedicalRoleOverview />
        ) : mockUserCtx.role == ("admin" as Role) ? (
          ""
        ) : (
          <div>Unknown role!</div>
        )}
      </main>
    </section>
  );
}
