import mongoose, { Document, Schema } from "mongoose";
import {
  Permissions,
  PermissionsType,
  Roles,
  RoleType,
} from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permissions";

export interface RoleDocument extends Document {
  name: RoleType;
  permissions: Array<PermissionsType>;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<RoleDocument>({
  name: {
    type: String,
    required: true,
    enum: Object.values(Roles),
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
    enum: Object.values(Permissions),
    default: function (this: RoleDocument) {
      const someName = this.name;
      return RolePermissions[someName];
    },
  },
});

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
