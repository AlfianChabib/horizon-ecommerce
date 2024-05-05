import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
