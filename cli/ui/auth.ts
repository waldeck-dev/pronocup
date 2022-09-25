import { colors, Input, Secret } from "../deps.ts";
import { clear } from "./utils.ts";
import { IAuthPayload, IAuthResponse } from "../types/api.ts";

let email: string,
  password: string;

email = "pronocup1@yopmail.com";
password = "Valentin74!";

async function authenticate({ email, password }: IAuthPayload) {
  const res = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: email, password }),
  });

  const resJson = await res.json();

  if (resJson.error) {
    const err = resJson.error;
    return {
      data: null,
      error: colors.bold.red(`${err.name} (${err.status}): ${err.message}`),
    };
  }

  return {
    data: { jwt: resJson.jwt as string, user: resJson.user } as IAuthResponse,
    error: false,
  };
}

export async function Auth(
  errorMessage?: string,
): Promise<IAuthResponse | void> {
  clear(errorMessage);

  const emailInput = Input;
  emailInput.inject(email);
  email = await emailInput.prompt({
    message: "📧 Enter your email",
    minLength: 1,
  });

  password = password ?? await Secret.prompt({
    message: "🔒 Enter you password",
    minLength: 1,
  });

  const { data, error } = await authenticate({ email, password });

  if (error && typeof error === "string") {
    password = "";
    return await Auth(error);
  }

  return data as IAuthResponse;
}
