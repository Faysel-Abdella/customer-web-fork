import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const SecurityPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Security</h2>
        <p className="text-muted-foreground mt-2">
          Manage your accounts security settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Change your password</CardTitle>
            <CardDescription>
              For your security, we recommend choosing a strong password that
              you don&apos;t use elsewhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              <Link href={"/profile/help/faq"}>Change password</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete my accounts</CardTitle>
            <CardDescription>
              Once you delete your account, all of your data will be permanently
              removed.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-red-500 bg-transparent text-red-500 dark:border-red-500"
              asChild
            >
              <Link href={"/profile/help/chat"}>Delete account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
