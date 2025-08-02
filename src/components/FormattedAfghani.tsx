"use client";
import React from "react";

import { useFormatter } from "next-intl";

interface FormattedAfghaniProps {
  amount: number;
}
const FormattedAfghani = ({ amount }: FormattedAfghaniProps) => {
  const format = useFormatter();

  const formattedPrice = format.number(amount, {
    style: "currency",
    currency: "AFN",
    minimumFractionDigits: 2,
  });
  return <span>{formattedPrice}</span>;
};

export default FormattedAfghani;
