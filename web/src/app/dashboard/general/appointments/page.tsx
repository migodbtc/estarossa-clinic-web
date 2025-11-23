import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../../components/ui/card";

export default function GeneralAppointments() {
  return (
    <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
      <CardHeader>
        <CardTitle>Staff Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-slate-200">
          Appointments view for nurses/doctors (placeholder).
        </p>
      </CardContent>
    </Card>
  );
}
