export interface IUser{
    _id?: string;
    name: string
    password: string
    comparePassword(providedPassword: string): Promise<boolean>;
}