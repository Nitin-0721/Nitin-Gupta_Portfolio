import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env configuration
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error('Error: ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be defined in .env');
    process.exit(1);
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected to seed admin...');

    // Find if admin already exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log(`Admin email "${email}" already exists. Updating credentials...`);
      admin.name = name;
      admin.password = password; // pre-save hook will hash this
      await admin.save();
      console.log('Admin account updated successfully!');
    } else {
      console.log(`Creating new admin account with email: ${email}`);
      admin = new Admin({
        name,
        email,
        password
      });
      await admin.save();
      console.log('Admin account created successfully!');
    }

    await mongoose.disconnect();
    console.log('Database disconnected. Seed process complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding admin failed:', error);
    process.exit(1);
  }
};

seedAdmin();
