import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eswar Rao — AI & Data Science',
  description: 'Portfolio of Mamidipaka Eswara Rao — AI & Data Science student specializing in Cloud & Edge Computing.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
