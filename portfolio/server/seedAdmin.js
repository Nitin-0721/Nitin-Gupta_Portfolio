import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) {
      await Admin.deleteOne({
        email: process.env.ADMIN_EMAIL
      });
    }

    await Admin.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });

    console.log('Admin created successfully');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();