import { Request, Response } from 'express';
import { ParkingService } from '../Services/ParkingService';

class ParkingController {
    async create(request: Request, response: Response): Promise<Response> {
        const {
            plate
        } = request.body;

        const parkingService = new ParkingService();

        const booking = await parkingService.create({
            plate
        });

        return response.status(201).json(booking);
    }

    async parkingPayament(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.params;

        const parkingService = new ParkingService();

        await parkingService.parkingPayament(id);

        return response.status(200).send();
    }

    async parkingExit(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.params;

        const parkingService = new ParkingService();

        await parkingService.parkingExit(id);

        return response.status(200).send();
    }
}

export { ParkingController };
