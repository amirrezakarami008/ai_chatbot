import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body style={{ backgroundColor: 'var(--bg-color)' }}>
        {children}
      </body>
    </html>
  );
}
