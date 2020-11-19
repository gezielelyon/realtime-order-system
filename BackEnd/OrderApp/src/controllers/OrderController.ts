import { Request, Response } from 'express';

import Order from '../models/Order';

class OrderController {
    public async store(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { table, description } = request.body;

        if (!table || !description) {
            return response.status(400);
        }

        const order = await Order.create({
            table,
            description,
        });

        request.io.emit('NewOrder', order);

        return response.json(order);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const orders = await Order.find();

        return response.json(orders);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { status } = request.body;

        if (!status) {
            return response.status(400);
        }

        const order = await Order.findByIdAndUpdate(
            { _id: id },
            { status },
            { new: true },
        );

        request.io.emit('statusChange', order);

        return response.json(order);
    }
}

export default new OrderController();
