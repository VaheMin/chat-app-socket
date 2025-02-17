import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

class AuthService {
  generateJWT(id: string, name: string): string {
    const token = jwt.sign(
      {
        id: id,
        name,
      },
      process.env.JWT_SECRET
    );

    return token;
  }

  async auth(name: string, password: string): Promise<String> {
    const user = await User.findOne({ name });

    if (!user) {
      throw new Error('Invalid Creedentials');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateJWT(user._id, user.name);
    return token;
  }

  async reg(name: string, password: string): Promise<String> {
    const user = await User.findOne({ name });

    if (user) {
      throw new Error('User already exist');
    }

     try {
       const newUser = new User({ name, password });
       await newUser.save();
       console.log(`User ${newUser.name} saved successfully.`);
     } catch (error) {
       console.error(`Error saving user ${user.name}:`, error);
     }

     const newUser = await User.findOne({ name });
     const token = this.generateJWT(newUser._id, newUser.name);
    return token;
  }
}

export default new AuthService();
