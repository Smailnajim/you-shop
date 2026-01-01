import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "apps/catalogue/src/prisma/schema.prisma",
  datasource: {
    provider: "postgresql",
    url: process.env.CATALOGUE_DATABASE_URL,
  },
});
