import User from "../../models/user.model";

export default async function userSeed() {
  const users = [
    { name: "John", password: "12345678" },
    { name: "James", password: "12345678" },
    { name: "Bill", password: "12345678" },
    { name: "Steve", password: "12345678" },
    { name: "Ann", password: "12345678" },
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

  console.log("Users has seeded successfully.");
}
