import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface InstructionProps {
  additionalInstructions: string;
  setAdditionalInstructions: React.Dispatch<React.SetStateAction<string>>;
}
const Instructions = ({
  additionalInstructions,
  setAdditionalInstructions,
}: InstructionProps) => {
  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <h3 className="mb-3 text-lg font-semibold">
          Add Instruction to Restaurant
        </h3>
        <Textarea
          value={additionalInstructions}
          placeholder="Write here..."
          className="min-h-[80px] w-full resize-none"
          onChange={(e) => setAdditionalInstructions(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default Instructions;
