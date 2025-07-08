'use client';

export default function RootLayout({ children }) {
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
                <main className='main'>{children}</main>
            </body>
        </html>
    );
}
