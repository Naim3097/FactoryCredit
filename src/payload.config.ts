import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Testimonials } from "./collections/Testimonials";
import { Hero } from "./globals/Hero";
import { Challenges } from "./globals/Challenges";
import { Problems } from "./globals/Problems";
import { WhyChooseUs } from "./globals/WhyChooseUs";
import { InfoPenting } from "./globals/InfoPenting";
import { Footer } from "./globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL (or DATABASE_URL_UNPOOLED) is required to start Payload."
  );
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is required to start Payload.");
}

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.PAYLOAD_EMAIL_FROM || "noreply@factorycredit.com.my";
const emailFromName = process.env.PAYLOAD_EMAIL_FROM_NAME || "Factory Credit";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Testimonials],
  globals: [Hero, Challenges, Problems, WhyChooseUs, InfoPenting, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  email:
    resendApiKey && !resendApiKey.includes("xxxx")
      ? resendAdapter({
          defaultFromAddress: emailFrom,
          defaultFromName: emailFromName,
          apiKey: resendApiKey,
        })
      : undefined,
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
    },
  }),
  sharp,
});
