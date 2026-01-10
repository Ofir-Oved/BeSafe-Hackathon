import { Link, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles/App.module.css';
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/chat" className={styles.appLink}>Chat</Link>
            <Link to="/admin" className={styles.appLink}>Admin</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
        <ToastContainer position="top-center" />
      </div>
  );
}

export default App;
