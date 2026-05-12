import type { GlobalConfig } from "payload";
import { revalidateHomeOnGlobalChange } from "../hooks/revalidateHome";
import { authenticatedOnly, publicRead } from "../access/policies";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: { read: publicRead, update: authenticatedOnly },
  hooks: { afterChange: [revalidateHomeOnGlobalChange] },
  fields: [
    { name: "companyDescription", type: "textarea", required: true },
    {
      name: "license",
      type: "group",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "validity", type: "text", required: true },
        { name: "adPermitNumber", type: "text", required: true },
        { name: "adPermitValidity", type: "text", required: true },
      ],
    },
    {
      name: "operatingHours",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "branches",
      type: "array",
      minRows: 1,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "address", type: "textarea", required: true },
        { name: "phoneDisplay", type: "text", required: true },
        { name: "wa", type: "text", required: true },
        { name: "mapUrl", type: "text", required: true },
      ],
    },
    { name: "copyrightText", type: "text", required: true },
    {
      name: "legalLinks",
      type: "group",
      fields: [
        { name: "privacyUrl", type: "text", required: true },
        { name: "disclaimerUrl", type: "text", required: true },
      ],
    },
  ],
};
