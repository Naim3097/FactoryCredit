import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const InfoPenting: GlobalConfig = {
  slug: "info-penting",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "heading", type: "text", required: true },
    {
      name: "terms",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "exampleCardTitle", type: "text", required: true },
    { name: "exampleCardSubtitle", type: "text", required: true },
    {
      name: "example",
      type: "group",
      fields: [
        { name: "amount", type: "text", required: true },
        { name: "rate", type: "text", required: true },
        { name: "tenure", type: "text", required: true },
        { name: "monthly", type: "text", required: true },
      ],
    },
    { name: "ctaLabel", type: "text", required: true },
  ],
};
