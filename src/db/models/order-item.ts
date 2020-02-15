import * as mongoose from 'mongoose';

import { IOrder } from './order';

export interface IOrderItem extends mongoose.Document {
    title: string;
    price: number;
    order: IOrder['_id'];
    userId: string;
};

export const OrderItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

const OrderItem = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);

export default OrderItem;
