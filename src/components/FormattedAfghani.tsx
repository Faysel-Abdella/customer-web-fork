"use client";
import React from "react";

import { useFormatter } from "next-intl";

interface FormattedAfghaniProps {
  amount: string | number;
  minimumFractionDigits?: number;
}
const FormattedAfghani = ({
  amount,
  minimumFractionDigits = 2,
}: FormattedAfghaniProps) => {
  const format = useFormatter();
  const finalAmount = typeof amount == "string" ? parseFloat(amount) : amount;
  if (!finalAmount) return;
  const formattedPrice = format.number(finalAmount, {
    style: "currency",
    currency: "AFN",
    minimumFractionDigits: minimumFractionDigits,
  });
  return <span>{formattedPrice}</span>;
};

export default FormattedAfghani;
