"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RefarralsPage = () => {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const referralCode = "REF2024XYZ123";
  const referralLink = `https://time-delivery.com/signup?ref=${referralCode}`;

  const copyToClipboard = async (text: string, type: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type == "code") {
        setCodeCopied(true);
      } else {
        setLinkCopied(true);
      }
      toast("Copied!", {
        description: `Referral ${type} copied to clipboard`,
      });
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast("Failed to copy");
    }
  };

  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Your Referral Code</h2>
        <p className="text-muted-foreground mt-2">
          Share your referral code with friends and earn rewards when they sign
          up.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Referral Code</CardTitle>
            <CardDescription className="text-muted-foreground">
              Share this code with your friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary flex items-center gap-3 rounded-lg border p-4">
              <code className="flex-1 font-mono text-lg tracking-wider">
                {referralCode}
              </code>
              <Button
                onClick={() => copyToClipboard(referralCode, "code")}
                className="bg-orange-500 hover:bg-orange-600"
                size="sm"
              >
                {codeCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Referral Link</CardTitle>
            <CardDescription className="text-muted-foreground">
              Or share this direct link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary flex items-center gap-3 rounded-lg border p-4">
              <code className="flex-1 font-mono text-sm break-all">
                {referralLink}
              </code>
              <Button
                onClick={() => copyToClipboard(referralLink, "link")}
                className="bg-orange-500 hover:bg-orange-600"
                size="sm"
              >
                {linkCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefarralsPage;
