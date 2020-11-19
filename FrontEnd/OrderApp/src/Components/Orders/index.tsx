import React, {useState, useEffect, useCallback} from 'react';
import socketIo from 'socket.io-client'

import {Container, Card} from './styles';

interface Order {
    _id: string;
    table: string;
    description: string;
    status: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('http://localhost:3333/orders').then((response) => response.json()).then(setOrders);
        const socket = socketIo('http://localhost:3333', {
            transports: ['websocket']
        });

        socket.on('NewOrder', (order: Order) => {
            setOrders((prevState) => [order, ...prevState])
        })

        socket.on("statusChange", (updatedOrder: Order) => {
            orders.map((order) => {
                if(order._id === updatedOrder._id) {
                    return updatedOrder;
                } else {
                    return order
                }
            })
        })
    }, [orders]);

    const handleChangeOrderStatus = useCallback((status, order: Order) => {
        fetch(`http://localhost:3333/orders/${order._id}/status`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status})
        })
    }, []);

    return(
        <Container>
            {orders.map((order) => (
                <Card key={order._id} status={order.status}>
                    <header>
                        <h3>Pedido <strong>#{order._id.substr(0, 15)}</strong></h3>
                        <small>mesa #{order.table}</small>
                    </header>
                    <p>{order.description}</p>
                    <select
                        value={order.status}onChange={({target: {value}}) => handleChangeOrderStatus(value, order)}
                    >
                        <option value="PENDING">Pendente</option>
                        <option value="PREPARING">Preparando</option>
                        <option value="DONE">Finalizado</option>
                    </select>
                </Card>
            ))}
        </Container>
    );
}

export default Orders;