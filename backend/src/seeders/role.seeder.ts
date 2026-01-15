import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.config";
import RoleModel from "../models/role.model";
import { RolePermissions } from "../utils/role-permissions";
import { Roles } from "../enums/role.enum";

const roleSeeder = async () => {
  console.log("Seeding roles started...");

  try {
    await connectDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      const existingRoles = await RoleModel.findOne({ name: role }).session(
        session
      );
      if (!existingRoles) {
        const newRoles = new RoleModel({
          name: role,
          permissions: permissions,
        });

        await newRoles.save({ session });

        console.log(`Role : ${role} added with permissions`);
      } else {
        console.log(`Role : ${role} already exists`);
      }
    }

    await session.commitTransaction();
    console.log("Transaction committed.");

    session.endSession();
    console.log("Session ended.");

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.log(error);
  }
};

roleSeeder().catch((error) => {
  console.log(`Error running seed script : ${error}`);
});
