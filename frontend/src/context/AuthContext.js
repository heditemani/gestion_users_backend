import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================================
    // Ila page titcharraj → tchayek ila 3andou token
    // ================================
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/users/profile/');
            setUser(res.data);
        } catch {
            localStorage.clear();
        } finally {
            setLoading(false);
        }
    };

    // ================================
    // REGISTER
    // ================================
    const register = async (data) => {
        const res = await api.post('/users/register/', data);
        return res.data;
    };

    // ================================
    // LOGIN
    // ================================
    const login = async (username, password) => {
        const res = await api.post('/users/login/', { username, password });
        
        // Khabi tokens fi localStorage
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        
        setUser(res.data.user);
        return res.data;
    };

    // ================================
    // LOGOUT
    // ================================
    const logout = async () => {
        try {
            const refresh = localStorage.getItem('refresh_token');
            await api.post('/users/logout/', { refresh });
        } finally {
            localStorage.clear();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading,
            register, 
            login, 
            logout,
            fetchProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook bech nsta3mlou fi kol component
export const useAuth = () => useContext(AuthContext);