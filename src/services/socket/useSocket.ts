import { useEffect } from 'react';
import { socketService } from './socketService';
import { ServerToClientEvents } from './types';

// Connect automatically when the app uses this hook (or call connect() in App.tsx)
export const useSocketConnect = () => {
    useEffect(() => {
        socketService.connect();
        return () => {
            socketService.disconnect();
        };
    }, []);
};

// Hook to listen to a specific event
export const useSocketEvent = <K extends keyof ServerToClientEvents>(
    event: K,
    callback: ServerToClientEvents[K]
) => {
    useEffect(() => {
        // Subscribe
        socketService.on(event, callback);

        // Unsubscribe on unmount
        return () => {
            socketService.off(event, callback);
        };
    }, [event, callback]);
};
