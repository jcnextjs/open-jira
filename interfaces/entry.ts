export const StatusValues = ['PENDING', 'IN-PROGRESS', 'DONE'] as const;

export const statusItems: { value: EntryStatus; label: string }[] = StatusValues.map((status) => ({
    value: status,
    label:
        status === 'PENDING'
            ? 'Pendiente'
            : status === 'IN-PROGRESS'
            ? 'En Progreso'
            : 'Completada',
}));

export type EntryStatus = typeof StatusValues[number];

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    updatedAt?: number;
    status: EntryStatus;
}
