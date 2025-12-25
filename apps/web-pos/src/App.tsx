import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import LoginView from './views/LoginView';
import HallView from './views/HallView';
import MenuView from './views/MenuView';
import CheckoutView from './views/CheckoutView';
import { Toaster } from 'react-hot-toast';
import { MainLayout, AuthLayout } from '@/layouts';

function App() {
    const { isAuthenticated } = useAuthStore();

    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                {/* Public Route */}
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <AuthLayout>
                                <LoginView />
                            </AuthLayout>
                        ) : <Navigate to="/hall" />
                    }
                />

                {/* Redirect root to hall or login */}
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/hall" : "/login"} />}
                />

                {/* Protected Routes */}
                <Route
                    path="/hall"
                    element={isAuthenticated ? (
                        <MainLayout>
                            <HallView />
                        </MainLayout>
                    ) : <Navigate to="/login" />}
                />
                <Route
                    path="/menu"
                    element={isAuthenticated ? (
                        <MainLayout>
                            <MenuView />
                        </MainLayout>
                    ) : <Navigate to="/login" />}
                />
                <Route
                    path="/checkout"
                    element={isAuthenticated ? (
                        <MainLayout>
                            <CheckoutView />
                        </MainLayout>
                    ) : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
