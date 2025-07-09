'use client';

import Header from '../components/Header';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const pathname = usePathname();

    const hideHeaderPages = ['/login', '/register']; // 헤더 제외하고 싶은 페이지
    const showHeader = !hideHeaderPages.includes(pathname);

    return (
        <html lang='ko'>
            <head>
                {/* Roboto 폰트 로드 */}
                <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet' />
            </head>
            <body
                style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: "'Roboto', sans-serif",
                    boxSizing: 'border-box',
                }}
            >
                {showHeader && <Header />}
                <main>{children}</main>
            </body>
        </html>
    );
}
