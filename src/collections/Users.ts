import type { CollectionConfig } from "payload";
import {
  authenticatedOnly,
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
  fields: [],
};
