export interface Order {
    id: string;
    items: any[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'completed';
    tableId: string;
}

// Events the Server sends to Client
export interface ServerToClientEvents {
    'order:created': (order: Order) => void;
    'order:updated': (order: Order) => void;
    'table:status': (tableId: string, status: string) => void;
    'kitchen:notification': (message: string) => void;
}

// Events the Client sends to Server
export interface ClientToServerEvents {
    'join:hall': (hallId: string) => void;
    'order:create': (order: Omit<Order, 'id' | 'status'>) => void;
}
