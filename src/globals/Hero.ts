import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Hero: GlobalConfig = {
  slug: "hero",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "headlineLine1", type: "text", required: true },
    { name: "headlineLine2", type: "text", required: true },
    { name: "subheadline", type: "textarea", required: true },
    {
      name: "bullets",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "formHeading", type: "text", required: true },
  ],
};
