import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function ForgotPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <Card className="w-full max-w-md bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 p-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Forgot Password (placeholder)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700 dark:text-slate-200">
            Password reset not configured in this demo.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost">
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
