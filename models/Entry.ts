import mongoose, { Model, Schema } from 'mongoose';
import { Entry, StatusValues } from '@app/interfaces';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: 0 },
    status: {
        type: String,
        enum: {
            values: [...StatusValues],
            message: '{VALUE} no es un estado válido',
        },
        default: 'PENDING',
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
