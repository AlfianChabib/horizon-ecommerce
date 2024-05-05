import { LoginForm } from '@/components/auth/form/LoginForm';
import SocialButton from '@/components/auth/SocialButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <div className="flex w-full items-end p-2 justify-between">
        <h1 className="text-2xl font-bold">Horizon</h1>
        <Link href="/" className="text-base text-muted-foreground hover:text-primary">
          Back to home
        </Link>
      </div>
      <Card className="w-96">
        <CardHeader className="items-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 items-center">
          <LoginForm />
          <div className="relative w-full">
            <div className="absolute w-full inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <SocialButton provider="google" />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
