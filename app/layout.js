import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body style={{ backgroundColor: 'var(--bg-color)' }}>
        {children}
      </body>
    </html>
  );
}
