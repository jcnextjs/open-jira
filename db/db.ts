import mongoose from 'mongoose';

/**
 * Status:
 * 0: disconnected
 * 1: connected
 * 2: connecting
 * 3: disconnecting
 */
const conectionStatus = {
    status: 0,
};

export const connect = async () => {
    if (conectionStatus.status === 1) {
        return;
    }

    if (mongoose.connections.length > 0) {
        conectionStatus.status = mongoose.connections[0].readyState;
        if (conectionStatus.status === 1) {
            return;
        }
        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '', {});
    conectionStatus.status = 1;
};

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return;

    if (conectionStatus.status === 0) {
        return;
    }

    await mongoose.disconnect();
    conectionStatus.status = 0;
};
