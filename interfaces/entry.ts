export const StatusValues = ['PENDING', 'IN-PROGRESS', 'DONE'] as const;

export type EntryStatus = typeof StatusValues[number];

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    updatedAt?: number;
    status: EntryStatus;
}
