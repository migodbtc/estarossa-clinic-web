import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <Card className="max-w-2xl w-full bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
        <CardHeader className="bg-transparent">
          <CardTitle>Untitled Clinic — Landing</CardTitle>
          <CardDescription>
            Welcome to the clinic app. Choose an action to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/auth/forgot">Forgot password</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
