import { useState } from "react";
import { ensureCsrfCookie, login } from "./api";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // submit handle
    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // the session + CSRF cookies must exist before the POST is accepted
            await ensureCsrfCookie();
            const response = await login({ email, password });
            onLogin(response.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="brand-row login-brand">
                    <div className="brand-logo">LW</div>
                    <div>
                        <p className="eyebrow">Ecommerce Admin</p>
                        <h1>Login to dashboard</h1>
                    </div>
                </div>

                <p className="muted">
                    This form sends credentials to Laravel, which starts a session stored in an httpOnly cookie.
                </p>

                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Email address</label>
                    <input
                        autoFocus
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {error && <p className="alert error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;