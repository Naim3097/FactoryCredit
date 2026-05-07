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
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Recommended size: 400×400px (square). Will be displayed in a circular frame.",
          },
        },
        {
          name: "imageUrl",
          type: "text",
          admin: {
            description:
              "Optional fallback if no image is uploaded. Used only when Image is empty.",
          },
        },
      ],
    },
  ],
};
