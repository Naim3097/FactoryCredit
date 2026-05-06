import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Problems: GlobalConfig = {
  slug: "problems",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "textarea", required: true },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "iconKey",
          type: "select",
          required: true,
          options: [
            { label: "Chart (debt/finance)", value: "chart" },
            { label: "Card (credit)", value: "card" },
            { label: "Alert (emergency)", value: "alert" },
            { label: "Home (renovation)", value: "home" },
            { label: "Money (deposit)", value: "money" },
            { label: "Education (study)", value: "education" },
          ],
        },
      ],
    },
  ],
};
