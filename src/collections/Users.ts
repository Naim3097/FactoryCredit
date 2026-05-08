import type { CollectionConfig } from "payload";
import {
  authenticatedOnly,
  isSuperadmin,
  SUPERADMIN_EMAIL,
  superadminOnly,
  superadminOnlyOrBootstrap,
  superadminOrSelf,
} from "../access/policies";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Strict" },
  },
  access: {
    create: superadminOnlyOrBootstrap,
    read: authenticatedOnly,
    update: superadminOrSelf,
    delete: superadminOnly,
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.email === SUPERADMIN_EMAIL) {
          return { ...data, role: "superadmin" };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Superadmin (full access)", value: "superadmin" },
        { label: "Editor (no user create/delete)", value: "editor" },
      ],
      admin: {
        description:
          "Only a superadmin can change roles. Editors cannot promote themselves.",
      },
      access: {
        create: ({ req }) => isSuperadmin(req),
        update: ({ req }) => isSuperadmin(req),
      },
    },
  ],
};
