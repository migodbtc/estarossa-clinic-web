import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "../../../../components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../components/ui/card";

export default function AdminSchema() {
  const rows = [
    ["appointments", "Stores appointment records and relations to users."],
    ["auth_users", "User auth table (email, password_hash, role)."],
    ["medical_records", "Medical records tied to appointments and users."],
    ["refresh_tokens", "Refresh tokens metadata and revocation status."],
    [
      "user_profiles",
      "Profile details for users (name, contact, specialization).",
    ],
    ["audit_log", "JSON audit logs for CRUD operations."],
  ];

  return (
    <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
      <CardHeader>
        <CardTitle>Data Schema Blueprint</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-slate-200">
          An overview of key tables (from DB dump).
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800 dark:text-slate-200">
                Table
              </TableHead>
              <TableHead className="text-gray-800 dark:text-slate-200">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-medium text-gray-800 dark:text-slate-100">
                  {r[0]}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-slate-200">
                  {r[1]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="text-gray-600 dark:text-slate-300">
            See `db/migrations/untitledclinicdb_20241121_013300.sql` for full
            schema.
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
}
