import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export interface AlertMessageProps {
  message?: string;
  title?: string;
  type?: 'error' | 'success';
}

export default function AlertMessage(props: AlertMessageProps) {
  const { message, type, title } = props;
  return (
    <Alert variant={type === 'error' ? 'destructive' : 'default'} className="p-2">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
