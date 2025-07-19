import React from "react";

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
    <div className="">
      <h3 className="mb-4 text-sm font-medium">Special Instructions </h3>
      <Textarea
        value={additionalInstructions}
        placeholder="Eg. Here write something..."
        className="min-h-[80px] w-full resize-none rounded-2xl"
        onChange={(e) => setAdditionalInstructions(e.target.value)}
      />
    </div>
  );
};

export default Instructions;
