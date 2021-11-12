import { getCustomRepository, Repository } from 'typeorm';
import { calculateParkingTime } from '../../util/calculateParkingTime';
import { Parking } from '../Entities/Parking';
import { ParkingRepository } from '../Repositories/ParkingRepository';

import AppError from '../../errors/AppError';

interface IParkingDTO {
    plate: string;
}

class ParkingService {
    private parkingRepository: Repository<Parking>;

    constructor() {
        this.parkingRepository = getCustomRepository(ParkingRepository);
    }

    async create({
        plate
    }: IParkingDTO) {
        const vehicleExistsInParking = await this.parkingRepository.find({
            where: {
                plate,
                left: false,
            }
        });

        if (vehicleExistsInParking.length >= 1) {
            throw new AppError('Veículo com mesma placa identificado no estacionamento.');
        }

        const parking = this.parkingRepository.create({
            plate,
            entry_time: new Date()
        });

        await this.parkingRepository.save(parking);

        return parking.id;
    }

    async parkingPayament(id: string) {
        const vehicle = await this.parkingRepository.findOne({
            where: { plate: id },
        });

        if (!vehicle) {
            throw new AppError('Veículo não encontrado.');
        }

        vehicle.paid = true;

        await this.parkingRepository.save(vehicle);
    }

    async parkingExit(id: string) {
        const vehicle = await this.parkingRepository.findOne({
            where: { plate: id },
        });

        if (!vehicle) {
            throw new AppError('Veículo não encontrado.');
        }

        if (!vehicle.paid) {
            throw new AppError('Saída liberada somente após o pagamento.');
        }

        vehicle.left = true;
        vehicle.exit_time = new Date();

        await this.parkingRepository.save(vehicle);
    }

    async parkingHistoric(plate: string) {
        const parkingExists = await this.parkingRepository.findOne({
            where: { plate },
        });

        if (!parkingExists) {
            throw new AppError('veículo não identificado!')
        }

        const parking = await this.parkingRepository.find({
            where: { plate },
        });

        let historic = calculateParkingTime(parking);

        return historic;
    }
}

export { ParkingService };
