export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  plan: "free" | "pro" | "enterprise";
  availableCredits: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStatus {
  type: "success" | "error";
  data: any;
}

export interface IUserCreds {
  email: string;
  password: string;
}