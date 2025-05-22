import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="!bg-gray-900">
        {children}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      </body>
    </html>
  );
}
