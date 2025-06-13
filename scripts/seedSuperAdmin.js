const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path as needed

const MONGO_URI = 'mongodb://localhost:27017/yourdbname'; // Update with your DB URI

async function createSuperAdmin() {
  await mongoose.connect(MONGO_URI);

  const existing = await User.findOne({ username: 'cobra' });
  if (existing) {
    console.log('Super admin already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('1234', 10);

  const superAdmin = new User({
    username: 'cobra',
    password: hashedPassword,
    role: 'superadmin', // Ensure your User model supports this
    // ...other required fields...
  });

  await superAdmin.save();
  console.log('Super admin created.');
  process.exit(0);
}

createSuperAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
