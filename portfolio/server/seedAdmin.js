import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin';

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is missing');
    }

    // Delete existing admin with this email
    await Admin.deleteOne({ email });

    // Create new admin
    // Password will automatically be hashed by AdminSchema.pre('save')
    await Admin.create({
      name,
      email,
      password
    });

    console.log(`Admin created successfully: ${email}`);

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();