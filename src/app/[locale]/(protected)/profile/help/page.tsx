import React from "react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Help & Support | Time delivery",
  description:
    "Find answers to frequently asked questions and get help with your Time-Delivery orders and account.",
};

const HelpAndSupportPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Help & Support</h2>
        <p className="text-muted-foreground mt-2">
          Get help and contact our support team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              <Link href={"/profile/help/faq"}>Browse FAQ</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href={"/profile/help/chat"}>Start Chat</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
