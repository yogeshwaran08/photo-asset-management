import axios from "axios";
import { toast } from "sonner";
import useUserStore from "../store/userStore";
import type { AuthOptions, IStatus, NoAuthOptions } from "@/types";
import { backend_url } from "@/config/backend";

export const noAuth = async ({
  method,
  url,
  data = {},
  options = {},
}: NoAuthOptions): Promise<IStatus> => {
  try {
    const headers = options?.headers || {};
    delete options.headers;

    const res = await axios({
      method,
      url: `${backend_url}/${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
      withCredentials: false,
    });

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "API request failed");
    }

    return { data: res.data, type: "success" } as IStatus;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    if (errorMessage !== "Token not provided") {
      toast.error(errorMessage);
    }
    return { data: errorMessage, type: "error" } as IStatus;
  }
};

export const auth = async ({
  method,
  url,
  data = {},
  options = {},
}: AuthOptions): Promise<IStatus> => {
  try {
    const headers = options?.headers || {};
    delete options.headers;
    const { jwtToken } = useUserStore.getState();

    const res = await axios({
      method,
      url: `${backend_url}/${url}`,
      data,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
      withCredentials: true,
    });

    // if (res?.data?.message != "success") {
    //   throw new Error(res?.data?.message || "API request failed");
    // }

    return { data: res.data, type: "success" } as IStatus;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(errorMessage);
    return { type: "error", data: errorMessage } as IStatus;
  }
};
