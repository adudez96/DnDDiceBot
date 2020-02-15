import * as mongoose from 'mongoose';

export interface IOrder extends mongoose.Document {
    active: boolean;
    channelId: number;
};

export const OrderSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
    },
    channelId: {
        type: Number,
        required: true,
    }
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
