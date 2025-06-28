"use client";
import { Edit } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const gender = ["male", "female", "other"];
const PersonalInfo = () => {
  const { user } = useAuth();

  if (user)
    return (
      <div className="w-full max-w-2xl space-y-5 px-10 py-5">
        <div>
          <h2 className="text-3xl font-bold">Personal Information</h2>
          <p className="text-muted-foreground mt-2">
            Manage your personal details and preferences.
          </p>
        </div>
        <form className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profile_file} />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={user.first_name} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={user.last_name} disabled />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Gender</Label>
              <Input
                id="firstName"
                value={gender[user.gender] || ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Date of Birth</Label>
              <Input id="lastName" value={user.date_of_birth || ""} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email || ""} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={user.contact_no ? user.country_code + user.contact_no : ""}
              disabled
            />
          </div>
        </form>
      </div>
    );
};

export default PersonalInfo;
