import { ErrorMapCtx, z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export const registerEmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const verificationRegisterSchema = z
  .object({
    token: z.string(),
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: 'custom', message: 'Password does not match.', path: ['confirmPassword'] });
    }
  });

export const forgotPasswordSchema = registerEmailSchema;

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterEmailSchema = z.infer<typeof registerEmailSchema>;
export type VerificationRegisterSchema = z.infer<typeof verificationRegisterSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
