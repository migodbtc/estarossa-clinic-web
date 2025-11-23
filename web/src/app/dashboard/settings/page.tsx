import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

export default function SettingsPage() {
  return (
    <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-slate-200">
          Settings placeholder.
        </p>
      </CardContent>
    </Card>
  );
}
