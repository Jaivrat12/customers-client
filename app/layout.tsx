import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Customers',
    description: 'A Dashboard that shows information about customers',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="dark"
        >
            <body className={inter.className}>
                <Providers>
                    <Navbar />
					{children}
				</Providers>
            </body>
        </html>
    );
}
