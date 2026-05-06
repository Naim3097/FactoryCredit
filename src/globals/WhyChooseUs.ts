import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const WhyChooseUs: GlobalConfig = {
  slug: "why-choose-us",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "heading", type: "text", required: true },
    {
      name: "reasons",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "imageUrl", type: "text", required: true },
      ],
    },
  ],
};
