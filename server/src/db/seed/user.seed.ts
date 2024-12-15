import User from '../../models/user.model';

export default async function userSeed() {
  const users = [
    { name: 'Armen', password: '1234' },
    { name: 'Garnik', password: '1234' },
    { name: 'Vahe', password: '1234' },
    { name: 'Razmik', password: '1234' },
  ];

  await User.deleteMany({});

  for (const user of users) {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log(`User ${user.name} saved successfully.`);
    } catch (error) {
      console.error(`Error saving user ${user.name}:`, error);
    }
  }

  console.log('Users has seeded successfully.');
}
