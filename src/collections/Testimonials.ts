import type { CollectionConfig } from "payload";
import {
  revalidateHomeOnCollectionChange,
  revalidateHomeOnCollectionDelete,
} from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "color"] },
  access: {
    read: publicRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  },
  hooks: {
    afterChange: [revalidateHomeOnCollectionChange],
    afterDelete: [revalidateHomeOnCollectionDelete],
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    {
      name: "color",
      type: "select",
      required: true,
      defaultValue: "red",
      options: [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first" },
    },
  ],
};
