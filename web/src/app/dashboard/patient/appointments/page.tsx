import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../components/ui/card";

export default function PatientAppointments() {
  return (
    <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
      <CardHeader>
        <CardTitle>My Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-slate-200">
          List of patient appointments (placeholder).
        </p>
      </CardContent>
    </Card>
  );
}
