import React from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <section className="min-h-screen p-2">{children}</section>;
}
