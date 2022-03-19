import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../db';
import { EntryModel, IEntry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return createEntry(req, res);
        default:
            return res.status(400).json({ message: 'Recurso no existe.' });
    }
}
const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' });
    await db.disconnect();
    res.status(200).json(entries);
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'La descripción es requerida.' });
    }

    const entry = new EntryModel({ description });
    console.log({ entry });

    try {
        await db.connect();
        await entry.save();
        await db.disconnect();
        return res.status(201).json(entry);
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({ message: 'Error al crear la entrada.' });
    }
};
