import './App.css';

function App() {
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
                    <a className='nav-link active' href='#dashboard'>Dashboard</a>
                    <a className='nav-link' href='#categories'>Categories</a>
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
                    <button>Add Product</button>
                </header>

                <section className='card-grid'>
                    <article className='infor card'>
                        <span>Total Categories</span>
                        <strong>8</strong>
                        <p>Manage product groups from here.</p>
                    </article>
                </section>

                <section className='card-grid'>
                    <article className='infor card'>
                        <span>Total Products</span>
                        <strong>24</strong>
                        <p>Products will come from Laravel API Later</p>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default App;