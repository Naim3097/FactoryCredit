import type { Access, PayloadRequest } from "payload";

export const SUPERADMIN_EMAIL = "sales@nexovadigital.com";

export const isSuperadmin = (req: PayloadRequest): boolean => {
  if (!req.user) return false;
  if (req.user.email === SUPERADMIN_EMAIL) return true;
  const role = (req.user as { role?: string | null }).role;
  return role === "superadmin";
};

export const publicRead: Access = () => true;
export const authenticatedOnly: Access = ({ req }) => Boolean(req.user);

export const superadminOnly: Access = ({ req }) => isSuperadmin(req);

// Bootstrap-safe variant: allows any authenticated user to create users
// until the superadmin account exists. Once it exists, only the superadmin
// can create new users.
export const superadminOnlyOrBootstrap: Access = async ({ req }) => {
  if (!req.user) return false;
  if (isSuperadmin(req)) return true;
  const existing = await req.payload.find({
    collection: "users",
    where: { email: { equals: SUPERADMIN_EMAIL } },
    limit: 1,
    depth: 0,
  });
  return existing.totalDocs === 0;
};

export const superadminOrSelf: Access = ({ req }) => {
  if (!req.user) return false;
  if (isSuperadmin(req)) return true;
  return { id: { equals: req.user.id } };
};
