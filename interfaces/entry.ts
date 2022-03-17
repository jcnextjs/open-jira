export type EntryStatus = 'PENDING' | 'IN-PROGRESS' | 'DONE';

export interface Entry {
    _id: string;
    decription: string;
    createAt: number;
    updateAt?: number;
    status: EntryStatus;
}
