"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteAccountSchema } from "@/lib/schemas/profile.schema";

const DeleteAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: z.infer<typeof deleteAccountSchema>) {
    toast("data", {
      description: (
        <code>
          <p>Password: {values.password}</p>
        </code>
      ),
    });
  }
  return (
    <div className="w-full space-y-5 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold text-red-500">Delete your account</h2>
        <p className="text-muted-foreground mt-2 mb-2">
          Once you delete your account, there is no going back. This action
          cannot be undone and will:
        </p>
        <ul className="text-muted-foreground mb-4 ml-4 space-y-1 text-sm">
          <li>• Permanently delete your profile and account data</li>
          <li>• Remove all your referral history and stats</li>
          <li>• Cancel any pending rewards or payouts</li>
          <li>• Revoke access to all services</li>
        </ul>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xs space-y-5 pl-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      className="-m-6 cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"outline"}
            className="w-full border-red-500 bg-transparent text-red-500 dark:border-red-500"
          >
            Delete Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DeleteAccountPage;
