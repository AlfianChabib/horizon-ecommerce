import { authInstance } from '@/lib/axios';
import { LoginSchema, RegisterEmailSchema, VerificationRegisterSchema } from '@/schema/auth-schema';
import { AxiosError } from 'axios';

export interface ResponseError {
  errors: string;
  seccess: false;
}

export const registerEmailService = async (payload: RegisterEmailSchema) => {
  return authInstance
    .post('/auth/register-email', payload)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.message;
    })
    .catch((err: AxiosError<ResponseError>) => {
      throw new Error(err.response?.data?.errors);
    });
};

export const verifyRegisterService = async (payload: VerificationRegisterSchema) => {
  return authInstance
    .post('/auth/register-complete', payload)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.message;
    })
    .catch((err: AxiosError<ResponseError>) => {
      throw new Error(err.response?.data?.errors);
    });
};

export const loginService = async (payload: LoginSchema): Promise<string> => {
  return authInstance
    .post('/auth/login', payload)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.accessToken);
        return data.message;
      }
    })
    .catch((err: AxiosError<ResponseError>) => {
      throw new Error(err.response?.data?.errors);
    });
};

export const apiLogin = async (payload: LoginSchema) => {
  const response = await fetch(`api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resJson = await response.json();

  console.log(resJson);

  if (resJson.success === true) {
    return resJson;
  }
};

export const getSessionService = async () => {
  return await authInstance
    .get('/auth/session')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) {
        console.log(data);
        return data;
      }
    })
    .catch((err: AxiosError<ResponseError>) => {
      throw new Error(err.response?.data?.errors);
    });
};
