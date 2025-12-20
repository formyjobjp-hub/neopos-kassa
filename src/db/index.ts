import Dexie, { Table } from 'dexie';
import { Product } from '../types';

export class PosDatabase extends Dexie {
    products!: Table<Product>;
    orders!: Table<any>;

    constructor() {
        super('NeoPosDB');
        this.version(1).stores({
            products: '++id, name, price, category',
            orders: '++id, tableId, total, status, synced'
        });
    }
}

export const db = new PosDatabase();
