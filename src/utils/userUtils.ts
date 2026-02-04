import type { IStatus, IUserCreds } from "../types/index";

export const refreshToken = async (): Promise<IStatus> => {
    return { type: "success", data: { accessToken: "mock_token" } };
};

export const loginUser = async (_creds: IUserCreds): Promise<IStatus> => {
    return { type: "success", data: { accessToken: "mock_token" } };
};

export const registerUser = async (_creds: any): Promise<IStatus> => {
    return { type: "success", data: { access: "mock_token" } };
};

export const logout = async (): Promise<IStatus> => {
    return { type: "success", data: null };
};

export const getAboutMe = async (): Promise<IStatus> => {
    return {
        type: "success",
        data: {
            user: {
                id: "1",
                email: "test@example.com",
                firstName: "Test",
                lastName: "User",
                plan: "free",
                availableCredits: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }
    };
};
