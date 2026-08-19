import { useState } from "react";

function Login({ onLogin }) {
    const [isRegistering, setIsRegistering] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const resetMessages = () => {
        setError("");
        setMessage("");
    };

    const switchMode = () => {
        setIsRegistering(!isRegistering);

        setUsername("");
        setPassword("");
        setConfirmPassword("");

        resetMessages();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        resetMessages();

        // =========================
        // REGISTER
        // =========================

        if (isRegistering) {
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:3000/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Registration failed.");
                    return;
                }

                setMessage(
                    "Registration successful. You can now log in."
                );

                setIsRegistering(false);

                setPassword("");
                setConfirmPassword("");

            } catch (error) {
                setError(
                    "Unable to connect to the server."
                );
            }

            return;
        }

        // =========================
        // LOGIN
        // =========================

        try {
            const response = await fetch(
                "http://localhost:3000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed.");
                return;
            }

            // Save JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            onLogin(data.user);

        } catch (error) {
            setError(
                "Unable to connect to the server."
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                {/* Header */}

                <div className="login-header">

                    <div className="login-logo">
                        <span className="logo-line"></span>
                        <span className="logo-dot"></span>
                    </div>

                    <h1>
                        {isRegistering
                            ? "Create Account"
                            : "Student Management"}
                    </h1>

                    <p>
                        {isRegistering
                            ? "Create an account to get started"
                            : "Sign in to manage student records"}
                    </p>

                </div>

                {/* Form */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    {/* Username */}

                    <div className="login-field">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter your username"
                            required
                        />

                    </div>

                    {/* Password */}

                    <div className="login-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {/* Confirm password */}

                    {isRegistering && (
                        <div className="login-field">

                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Re-enter your password"
                                required
                            />

                        </div>
                    )}

                    {/* Password requirements */}

                    {isRegistering && (
                        <div className="password-requirements">

                            <p>
                                Password requirements
                            </p>

                            <span>
                                • At least 8 characters
                            </span>

                            <span>
                                • Uppercase and lowercase letters
                            </span>

                            <span>
                                • At least one number
                            </span>

                            <span>
                                • At least one special character
                            </span>

                        </div>
                    )}

                    {/* Error */}

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    {/* Success */}

                    {message && (
                        <div className="login-success">
                            {message}
                        </div>
                    )}

                    {/* Submit */}

                    <button
                        className="login-button"
                        type="submit"
                    >
                        {isRegistering
                            ? "Create Account"
                            : "Login"}
                    </button>

                </form>

                {/* Switch login/register */}

                <div className="auth-switch">

                    {isRegistering ? (
                        <>
                            <span>
                                Already have an account?
                            </span>

                            <button
                                type="button"
                                onClick={switchMode}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <span>
                                Don't have an account?
                            </span>

                            <button
                                type="button"
                                onClick={switchMode}
                            >
                                Register
                            </button>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Login;