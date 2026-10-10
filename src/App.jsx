import './App.css';
import { useState } from 'react';
import Login from './Login';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import Dashboard from './Dashboard';

function App() {
    const [user, setUser] = useState(null);
    const [activeScreen, setActiveScreen] = useState('dashboard');

    function handleLogout() {
        localStorage.removeItem('access_token');
        setActiveScreen('dashboard');
        setUser(null);
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
                    <CategoryManager token={localStorage.getItem('access_token')} />
                ) : activeScreen === 'products' ? (
                    <ProductManager token={localStorage.getItem('access_token')} />
                ) : (
                    <Dashboard
                        token={localStorage.getItem('access_token')}
                        onOpenProducts={() => setActiveScreen('products')}
                        onLogout={handleLogout}
                    />
                )}
            </main>
        </div>
    );
}

export default App;