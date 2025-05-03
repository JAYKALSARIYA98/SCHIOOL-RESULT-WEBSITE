const bcrypt = require('bcrypt');

const plainPassword = 'vidya@123';  // Change this to your actual password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
