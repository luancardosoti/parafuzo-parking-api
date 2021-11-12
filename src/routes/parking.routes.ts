import { Router } from 'express';

import { ParkingController } from '../app/Controllers/ParkingController';

import createValidator from '../app/Validators/Parking/createValidator';
// import updateValidator from '../app/validators/HomeDetails/updateValidator';

const routes = Router();

const parkingController = new ParkingController();

routes.get('/:plate', parkingController.parkingHistoric);
routes.post('/', createValidator, parkingController.create);
routes.put('/:id/pay', parkingController.parkingPayament);
routes.put('/:id/out', parkingController.parkingExit);

export default routes;
