import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const parentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    displayName: {
      type: String,
    },
    role: {
      type: String,
      default: 'parent',
    },
    // Using Child relationship
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
);

parentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Parent = mongoose.model('parent', parentSchema);

module.exports = Parent;
// export default User;
