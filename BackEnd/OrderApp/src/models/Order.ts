import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    table: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'PREPARING', 'DONE'],
        default: 'PENDING',
    },
});

export default mongoose.model('Order', OrderSchema);
