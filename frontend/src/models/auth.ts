import { User } from "./userModel";

export interface Auth{
    token?: string;
    user?: User
}