import { ResponseAuth } from "../types";
import Axios from "../lib/Axios";

export async function login(params: {
  email: string;
  password: string;
}): Promise<ResponseAuth> {
    const response = await Axios.post("auth/signin", params);
    return response.data.data;
}

export async function signUp(params: {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
}) {
  const response = await Axios.post("auth/register",  params );

  return response.data.data;
}
