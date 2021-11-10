import { Router } from 'express';

// Routes
import parkingRoutes from './parking.routes';

const routes = Router();

routes.use('/parking', parkingRoutes);

export default routes;
