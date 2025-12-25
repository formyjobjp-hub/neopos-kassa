import { ServerToClientEvents, ClientToServerEvents } from './types';

type EventHandler<T = any> = (data: T) => void;

class SocketService {
    private isConnected: boolean = false;
    private listeners: Map<string, EventHandler[]> = new Map();

    // Singleton instance
    private static instance: SocketService;

    private constructor() {
        // In the future, initialize Socket.io client here
        // this.socket = io(APP_CONFIG.API.SOCKET_URL);
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect() {
        if (this.isConnected) return;
        console.log('🔌 Socket Connecting... (Mock)');
        this.isConnected = true;

        // Simulate a connection event
        setTimeout(() => {
            console.log('✅ Socket Connected!');
        }, 1000);
    }

    public disconnect() {
        console.log('🔌 Socket Disconnected');
        this.isConnected = false;
    }

    // Subscribe to an event
    public on<K extends keyof ServerToClientEvents>(event: K, callback: ServerToClientEvents[K]) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)?.push(callback);
        console.log(`👂 Subscribed to: ${event}`);
    }

    // Unsubscribe
    public off<K extends keyof ServerToClientEvents>(event: K, callback: ServerToClientEvents[K]) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            this.listeners.set(event, callbacks.filter(cb => cb !== callback));
        }
    }

    // Simulate receiving an event (For testing/development without backend)
    public _simulateEvent<K extends keyof ServerToClientEvents>(event: K, data: Parameters<ServerToClientEvents[K]>[0]) {
        console.log(`⚡ Mock Event Received: ${event}`, data);
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(cb => cb(data));
        }
    }

    // Emit event to server
    public emit<K extends keyof ClientToServerEvents>(event: K, data: Parameters<ClientToServerEvents[K]>[0]) {
        console.log(`📤 Emitting: ${event}`, data);
        // In real app: this.socket.emit(event, data);
    }
}

export const socketService = SocketService.getInstance();
