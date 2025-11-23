import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <Card className="w-full max-w-md bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 p-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Register (placeholder)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700 dark:text-slate-200">
            Registration flow not implemented. Use Login to mock a user.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/auth/login">Go to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
