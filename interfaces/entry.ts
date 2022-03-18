export const StatusValues = ['PENDING', 'IN-PROGRESS', 'DONE'] as const;

export type EntryStatus = typeof StatusValues[number];

export interface Entry {
    _id: string;
    description: string;
    createAt: number;
    updateAt?: number;
    status: EntryStatus;
}
