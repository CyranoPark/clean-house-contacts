import { useState, useEffect } from 'react';
import { authUser } from '../api/firebase';

const TIME_OUT = 5000;

export function useAuthUser() {
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        fail: false,
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unregisterAuthObserver = authUser((user) => {
            setAuthState({ pending: false, isSignedIn: !!user, fail: false });
            setUser(user);
        });
        return () => unregisterAuthObserver();
    }, []);

    useEffect(() => {
        if (user) return;

        const clearId = setTimeout(() => {
            setAuthState({ pending: false, isSignedIn: false, fail: true });
        }, TIME_OUT);

        return () => {
            clearTimeout(clearId);
        };
    }, [user]);

    return { user, ...authState };
}
