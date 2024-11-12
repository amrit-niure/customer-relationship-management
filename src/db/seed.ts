import * as argon from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Database URL not found. Please set DATABASE_URL in your environment variables.",
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  const startTime = Date.now();
  console.log("Seeding Started...");

  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.role, "ADMIN"))
    .limit(1);

  if (existingAdmin.length === 0) {
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_EMAIL) {
      throw new Error(
        "Admin credentials not found. Please set both ADMIN_EMAIL and ADMIN_PASSWORD in your environment variables.",
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    const hashedPassword = await argon.hash(adminPassword);

    // Insert the admin user
    await db.insert(users).values({
      firstName: "Amrit",
      lastName: "Niure",
      email: adminEmail,
      hashedPassword: hashedPassword,
      address: "104 Bathurst Street, Sydney NSW 2000, Australia",
      phoneNumber: "0424562124",
      title: "IT Administrator",
      role: "ADMIN",
      status: "ACTIVE",
    });

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }

  const endTime = Date.now();
  const durationInMs = endTime - startTime;
  console.log(`Data seeded successfully in ${durationInMs} ms.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding users:", err);
  process.exit(0);
});
