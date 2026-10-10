import './App.css';
import { useEffect, useState } from 'react';
import Login from './Login';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import Dashboard from './Dashboard';
import { ensureCsrfCookie, logout, me } from './api';

function App() {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);
    const [activeScreen, setActiveScreen] = useState('dashboard');

    // The session cookie is the only credential, so ask the server who we are
    // instead of trusting anything cached locally.
    useEffect(() => {
        ensureCsrfCookie()
            .then(() => me())
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setCheckingSession(false));
    }, []);

    async function handleLogout() {
        // Clear the UI first so the screen changes even if the call fails.
        setUser(null);
        setActiveScreen('dashboard');

        await logout().catch(() => {});
    }

    if (checkingSession) {
        return <main className="auth-page">Checking session...</main>;
    }

    if (!user) {
        return <Login onLogin={setUser}></Login>;
    }

    return (
        <div className='admin-layout'>
            {/* // Side bar */}
            <aside className='sidebar'>
                <div className="brand">
                    <div className="brand-logo">LW</div>
                    <div>
                        <h2>Learn Admin</h2>
                        <p>Ecommerce Panel</p>
                    </div>
                </div>

                <nav className='nav-list' aria-label="Admin navigation">
                    <button
                        className={activeScreen === 'dashboard' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        onClick={() => setActiveScreen('dashboard')}
                    >Dashboard</button>
                    <button
                        className={activeScreen === 'categories' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        onClick={() => setActiveScreen('categories')}
                    >Categories</button>
                    <button
                        className={activeScreen === 'products' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        onClick={() => setActiveScreen('products')}
                    >Products</button>
                </nav>
            </aside>

            {/* // Main content */}
            <main className='main-content'>
                {activeScreen === 'categories' ? (
                    <CategoryManager />
                ) : activeScreen === 'products' ? (
                    <ProductManager />
                ) : (
                    <Dashboard
                        onOpenProducts={() => setActiveScreen('products')}
                        onLogout={handleLogout}
                    />
                )}
            </main>
        </div>
    );
}

export default App;