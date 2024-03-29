import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@app/db';
import { EntryModel, IEntry } from '@app/models';

type Data = { message: string } | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query as { id: string };

    switch (req.method) {
        case 'GET':
            return getEntry(id, res);
        case 'PUT':
            return updateEntry(id, req, res);
        case 'DELETE':
            return deleteEntry(id, res);
        default:
            return res.status(400).json({ message: 'Recurso no existe.' });
    }
}

const getEntry = async (id: string, res: NextApiResponse<Data>) => {
    await db.connect();
    const entry = await EntryModel.findById(id);
    await db.disconnect();

    return !entry
        ? res.status(404).json({ message: `La tarea con id = '${id}' no existe.` })
        : res.status(200).json(entry!);
};

const updateEntry = async (id: string, req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const entry = await EntryModel.findById(id);

    if (!entry) {
        await db.disconnect();
        return res.status(404).json({ message: `La tarea con id = '${id}' no existe.` });
    }

    const { description = entry.description, status = entry.status } = req.body;

    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(
            id,
            {
                description,
                status,
                updatedAt: Date.now(),
            },
            { new: true, runValidators: true }
        );

        await db.disconnect();
        return res.status(200).json(updatedEntry!);
    } catch (error: any) {
        await db.disconnect();
        return res.status(500).json({ message: error.errors.status.message });
    }
};

const deleteEntry = async (id: string, res: NextApiResponse<Data>) => {
    await db.connect();
    const entry = await EntryModel.findById(id);

    if (!entry) {
        await db.disconnect();
        return res.status(404).json({ message: `La tarea con id = '${id}' no existe.` });
    }

    const deletedEntry = await entry.remove();
    await db.disconnect();
    return res.status(200).json(deletedEntry);
};
