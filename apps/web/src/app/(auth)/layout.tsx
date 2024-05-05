export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-screen flex-col items-center px-2">{children}</main>;
}
