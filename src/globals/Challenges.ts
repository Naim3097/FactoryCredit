import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Challenges: GlobalConfig = {
  slug: "challenges",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "heading", type: "textarea", required: true },
    {
      name: "concerns",
      type: "array",
      minRows: 1,
      fields: [
        { name: "text", type: "text", required: true },
        {
          name: "iconKey",
          type: "select",
          required: false,
          admin: {
            description:
              "Optional icon shown beside the concern. Leave blank to use a default icon.",
          },
          options: [
            { label: "Question (uncertainty)", value: "question" },
            { label: "Document (paperwork)", value: "document" },
            { label: "Clock (slow approval)", value: "clock" },
            { label: "Lock (privacy/secure)", value: "lock" },
            { label: "Shield (trust)", value: "shield" },
            { label: "Percent (high interest)", value: "percent" },
            { label: "Hidden fee (eye-off)", value: "hiddenFee" },
            { label: "Reject (rejected)", value: "reject" },
            { label: "Money (cost)", value: "money" },
            { label: "Chat (no support)", value: "chat" },
          ],
        },
      ],
    },
    { name: "ctaBannerText", type: "text", required: true },
  ],
};
