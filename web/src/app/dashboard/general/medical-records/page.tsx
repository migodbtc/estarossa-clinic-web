import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";

export default function GeneralMedicalRecords() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Staff Medical Records</h2>
      <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
        <CardHeader>
          <CardTitle>Staff Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-slate-200">Medical records view for staff (placeholder).</p>
        </CardContent>
      </Card>
    </div>
  );
