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
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "ctaBannerText", type: "text", required: true },
  ],
};
