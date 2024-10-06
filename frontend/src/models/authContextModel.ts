import { User } from "./userModel";

export interface AuthContextModel {
  login: (email: string, password: string) => void;
  logout: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
}
