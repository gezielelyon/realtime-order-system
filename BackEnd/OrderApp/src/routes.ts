import { Router } from 'express';

import OrderController from './controllers/OrderController';

const Routes = Router();

Routes.get('/orders', OrderController.index);
Routes.post('/orders', OrderController.store);
Routes.patch('/orders/:id/status', OrderController.update);

export default Routes;
