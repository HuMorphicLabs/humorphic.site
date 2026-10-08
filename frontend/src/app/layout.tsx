import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Humorphic Lab - Autonomous Robotics & 3D Cybernetics',
  description:
    'Autonomous robotics research space transforming mathematical ideas into sentient physical actuators through biomorphic kinematics, deep perception engines, and 3D WebGL telemetry.',
  keywords: [
    '3D Web',
    'Robotics',
    'Three.js',
    'React Three Fiber',
    'Cybernetics',
    'Kinematics',
    'AI Control',
    'Humanoid Robot',
  ],
  authors: [{ name: 'Humorphic Robotics Lab' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Humorphic Lab - Autonomous Robotics & 3D Cybernetics',
    description:
      'Explore our 32-DOF biomorphic autonomous humanoid platform in interactive 3D WebGL.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-cyber-bg text-slate-100 antialiased flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
