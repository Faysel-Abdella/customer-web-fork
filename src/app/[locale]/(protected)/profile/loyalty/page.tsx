import React from "react";

import { Share2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoyaltyPage = () => {
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">Loyalty Points</h2>
        <p className="text-muted-foreground mt-2">
          Earn points with every purchase and referral. Unlock exclusive rewards
          and benefits.
        </p>
      </div>
      <div className="space-y-5">
        <Card className="border-none bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-none dark:from-red-500 dark:to-orange-500">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <div className="bg-primary mx-auto flex h-10 w-10 items-center justify-center rounded-full border-4 border-yellow-500">
                <Star className="h-8 w-8 fill-white text-orange-500" />
              </div>
            </div>
            <div className="mb-2 text-4xl font-bold">{3000} pts</div>
            <div className="text-lg text-orange-100">Loyalty Balance</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary border shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-xl">
              Give and Get Points
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              When a friend uses your code, you will get{" "}
              <span className="text-foreground font-semibold">
                3,000 points
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="w-full py-3 text-lg font-medium">
              <Share2 className="mr-2 h-5 w-5" />
              Share Invite Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyPage;
