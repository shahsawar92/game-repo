import { useState, useEffect } from 'react';

const useTimer = (initialTime) => {
    const [timer, setTimer] = useState(initialTime);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const storedTime = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("resendTimer") || 'null') : null;

        if (storedTime) {
            const remainingTime = Math.max(0, storedTime - Date.now());
            setTimer(Math.floor(remainingTime / 1000));
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    useEffect(() => {
        if (timer > 0) {
            if (typeof window !== 'undefined')
                localStorage.setItem('resendTimer', Date.now() + timer * 1000);
        } else {
            if (typeof window !== 'undefined')
                localStorage.removeItem('resendTimer');
        }
    }, [timer]);

    return { timer, canResend, resetTimer: () => setTimer(initialTime) };
};


export default useTimer;