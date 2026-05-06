import type { Access } from "payload";

export const publicRead: Access = () => true;
export const authenticatedOnly: Access = ({ req }) => Boolean(req.user);
