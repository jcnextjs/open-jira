import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { EntryModel, IEntry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res);
        //case 'POST':
        //    return res.status(200).json({ message: 'POST request received.' });
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
