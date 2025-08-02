"use client";

import { useState } from "react";

import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReferralSharingProps {
  referralCode: string;
}

export function ReferralSharing({ referralCode }: ReferralSharingProps) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL!}/signup?referral_code=${referralCode}`;

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

  if (referralCode)
    return (
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share & Earn
          </CardTitle>
          <CardDescription>
            Share your referral code or link with friends to earn points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-secondary-foreground mb-2 block text-sm font-medium">
              Referral Code
            </label>
            <div className="flex items-center gap-2">
              <div className="bg-secondary flex-1 rounded-lg border px-4 py-3 font-mono text-lg">
                {referralCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralCode, "code")}
                className="bg-secondary"
              >
                {codeCopied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-secondary-foreground mb-2 block text-sm font-medium">
              Referral Link
            </label>
            <div className="flex items-center gap-2">
              <div className="bg-secondary flex-1 rounded-lg border px-4 py-3 text-sm break-all">
                {referralLink}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralLink, "link")}
                className="bg-secondary"
              >
                {linkCopied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}
