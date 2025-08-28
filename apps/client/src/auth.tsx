import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchUser, type AuthResponse } from "./lib/utils";


interface AuthState {
    isAuthenticated: boolean;
    user: AuthResponse["user"] | null;
    login: (user: AuthResponse["user"], token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthResponse["user"] | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = useCallback((userData: AuthResponse["user"], token: string) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", token);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
    }, []);

    // Restore auth state on app load
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            // Validate token with your API
            fetchUser()
                .then((res) => res.user)
                .then((userData) => {
                    if (userData) {
                        login(userData, token);
                    } else {
                        logout();
                    }
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [login, logout]);

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
