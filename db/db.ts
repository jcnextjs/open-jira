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
        console.log('Already connected');
        return;
    }

    if (mongoose.connections.length > 0) {
        conectionStatus.status = mongoose.connections[0].readyState;
        if (conectionStatus.status === 1) {
            console.log('Already connected[#2]');
            return;
        }
        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '', {});
    conectionStatus.status = 1;
    console.log(`Connected to MongoDB: ${process.env.MONGO_URL}`);
};

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return;

    if (conectionStatus.status === 0) {
        console.log('Already disconnected');
        return;
    }

    await mongoose.disconnect();
    conectionStatus.status = 0;
    console.log('Disconnected');
};
