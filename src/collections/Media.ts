import type { CollectionConfig } from "payload";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: publicRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 200,
        position: "centre",
      },
      {
        name: "card",
        width: 400,
        height: 400,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Alternative text for accessibility",
      },
    },
  ],
};
