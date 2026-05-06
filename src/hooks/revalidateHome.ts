import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

export const revalidateHomeOnGlobalChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath("/");
  return doc;
};

export const revalidateHomeOnCollectionChange: CollectionAfterChangeHook = ({
  doc,
}) => {
  revalidatePath("/");
  return doc;
};

export const revalidateHomeOnCollectionDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  revalidatePath("/");
  return doc;
};
