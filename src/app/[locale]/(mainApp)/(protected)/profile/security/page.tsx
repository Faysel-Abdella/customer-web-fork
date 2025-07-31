import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <CardDescription>Update your password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <CustomLink href={"/profile/security/change-password"}>
                Change password
              </CustomLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete your accounts</CardTitle>
            <CardDescription>
              Your account will be permanently erased.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-red-500 bg-transparent text-red-500 dark:border-red-500"
              asChild
            >
              <CustomLink href={"/profile/security/delete-account"}>
                Delete account
              </CustomLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
