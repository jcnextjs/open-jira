import mongoose from 'mongoose';

import { db } from './';
import { EntryModel } from '@app/models';
import { Entry } from '@app/interfaces';

export const getEntryById = async (id: string): Promise<Entry | null> => {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    await db.connect();
    const entry = await EntryModel.findById(id).lean();
    await db.disconnect();

    return entry;
};
