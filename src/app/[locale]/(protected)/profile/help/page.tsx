import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HelpAndSupportPage = () => {
  return (
    <div className="w-full space-y-6 px-10 py-5">
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
              Browse FAQ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Contact Us</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Guide</CardTitle>
            <CardDescription>Learn how to use our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              View Guide
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
