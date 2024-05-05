'use client';

import FormInput from '@/components/elements/FormInput';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginSchema, loginSchema } from '@/schema/auth-schema';
import { apiLogin, loginService } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AlertMessage, { AlertMessageProps } from '@/components/elements/AlertMessage';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginCallback = searchParams.get('callback');
  const accessToken = searchParams.get('accessToken');

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginSuccess = () => {
    router.push(loginCallback || '/');
  };

  useCallback(() => {
    if (accessToken) {
      router.push(loginCallback || '/');
    }
  }, [accessToken, router, loginCallback]);

  useEffect(() => {
    form.watch((data) => {
      if (data) setAlertMessage(undefined);
    });
  }, [form]);

  function onSubmit(values: LoginSchema) {
    setLoading(true);
    loginService(values)
      .then((res) => {
        form.reset();
        setAlertMessage({ message: res, title: 'Success', type: 'success' });
        loginSuccess();
      })
      .catch((err) => {
        setAlertMessage({ message: err.message, title: 'Error', type: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        {alertMessage && (
          <AlertMessage message={alertMessage.message} title={alertMessage.title} type={alertMessage.type} />
        )}
        <form className="flex w-full flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput<LoginSchema> control={form.control} placeholder="Email" type="email" name="email" />
          <FormInput<LoginSchema>
            control={form.control}
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login With Email'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
