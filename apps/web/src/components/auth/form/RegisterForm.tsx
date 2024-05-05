'use client';

import AlertMessage, { AlertMessageProps } from '@/components/elements/AlertMessage';
import FormInput from '@/components/elements/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RegisterEmailSchema, registerEmailSchema } from '@/schema/auth-schema';
import { registerEmailService } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);

  const form = useForm<RegisterEmailSchema>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: RegisterEmailSchema) {
    setAlertMessage(undefined);
    setLoading(true);
    registerEmailService(values)
      .then((res) => {
        setAlertMessage({ message: res, title: 'Success', type: 'success' });
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
          <FormInput<RegisterEmailSchema> control={form.control} placeholder="Email" type="email" name="email" />
          <Button type="submit" disabled={loading}>
            Register With Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
