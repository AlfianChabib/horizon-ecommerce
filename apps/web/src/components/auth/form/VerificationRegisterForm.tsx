'use client';

import AlertMessage, { AlertMessageProps } from '@/components/elements/AlertMessage';
import FormInput from '@/components/elements/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { verificationRegisterSchema, VerificationRegisterSchema } from '@/schema/auth-schema';
import { verifyRegisterService } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function VerifiactionRegisterForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);
  const router = useRouter();

  const form = useForm<VerificationRegisterSchema>({
    resolver: zodResolver(verificationRegisterSchema),
    defaultValues: { username: '', password: '', confirmPassword: '', token },
    mode: 'onSubmit',
  });

  function onSubmit(values: VerificationRegisterSchema) {
    setAlertMessage(undefined);
    setLoading(true);
    verifyRegisterService(values)
      .then((res) => {
        setAlertMessage({ message: res, title: 'Success', type: 'success' });
        router.push('/login');
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
      {alertMessage && (
        <AlertMessage message={alertMessage.message} title={alertMessage.title} type={alertMessage.type} />
      )}
      <Form {...form}>
        <form className="flex w-full flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput<VerificationRegisterSchema>
            control={form.control}
            placeholder="Username"
            type="text"
            name="username"
          />
          <FormInput<VerificationRegisterSchema>
            control={form.control}
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
          />
          <FormInput<VerificationRegisterSchema>
            control={form.control}
            placeholder="Cofirm Password"
            type="password"
            name="confirmPassword"
            autoComplete="off"
          />
          <Button type="submit" disabled={loading}>
            Register With Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
