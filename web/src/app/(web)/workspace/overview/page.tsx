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
import Link from "next/link";
import WorkspaceTitle from "@/components/WorkspaceTitle";

export default function Page() {
  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Workspace Overview"
        subtext="Summary and dashboard widgets go here."
        currentPage="Overview"
        currentHref="/workspace/overview"
      />
      <div className="w-full">
        {/* Dashboard widgets will be implemented here in the future */}
        <div className="flex flex-row">
          <div className="flex-1 p-2">
            <OverviewWidget
              title="Upcoming Appointments"
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
              title="Upcoming Appointments"
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
              title="Upcoming Appointments"
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
              title="Upcoming Appointments"
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
            <CardContent>Testing as well</CardContent>
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
      </div>
    </section>
  );
}
