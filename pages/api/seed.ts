import type { NextApiRequest, NextApiResponse } from 'next';

import { db, seedData } from '@app/db';
import { EntryModel } from '@app/models';

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({
            message: 'Este recurso sólo está disponible en desarrollo.',
        });
    }

    await db.connect();

    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);
    await db.disconnect();

    res.status(200).json({ message: 'Información cargada exitosamente.' });
}
