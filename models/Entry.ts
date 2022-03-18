import mongoose, { Model, Schema } from 'mongoose';
import { Entry, StatusValues } from '../interfaces';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: { type: String, required: true },
    createAt: { type: Number },
    updateAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: [...StatusValues],
            message: '{VALUE} no es un estado válido',
        },
        required: true,
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
