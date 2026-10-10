import './App.css';
import { useState } from 'react';
import Login from './Login';
import CategoryManager from './CategoryManager';

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
                    <a className='nav-link' href='#products'>Products</a>
                </nav>
            </aside>

            {/* // Main content */}
            <main className='main-content'>
                <header className='page-header'>
                    <div>
                        <p>Dashboard</p>
                        <h1>Ecommerce Admin</h1>
                    </div>
                    <div className='header-actions'>
                        <button type='button'> Add Product</button>
                        <button type='button' className='secondary-button' onClick={handleLogout}>Logout</button>
                    </div>
                </header>

                {activeScreen === 'dashboard' ? (
                    <section className='card-grid'>
                        <article className='info-card'>
                            <span>Total Categories</span>
                            <strong>8</strong>
                            <p>Manage product groups from here.</p>
                        </article>

                        <article className='info-card'>
                            <span>Total Products</span>
                            <strong>24</strong>
                            <p>Products will come from Laravel API Later</p>
                        </article>
                    </section>
                ) : (
                    <CategoryManager
                        token={localStorage.getItem('access_token')}
                    />
                )}
            </main>
        </div>
    );
}

export default App;