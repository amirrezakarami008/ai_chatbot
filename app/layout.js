import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="!bg-gray-900">
        {children}
      </body>
    </html>
  );
}
