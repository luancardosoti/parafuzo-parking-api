import { getCustomRepository, Repository } from 'typeorm';
import { Parking } from '../Entities/Parking';
import { ParkingRepository } from '../Repositories/ParkingRepository';

// import AppError from '../../errors/AppError';

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
            throw new Error('Veículo com mesma placa identificado no estacionamento.');
        }

        const parking = this.parkingRepository.create({
            plate,
        });

        await this.parkingRepository.save(parking);

        return parking.id;
    }

    async parkingPayament(id: string) {
        const vehicle = await this.parkingRepository.findOne({
            where: { plate: id },
        });

        if (!vehicle) {
            throw new Error('Veículo não encontrado.');
        }

        vehicle.paid = true;

        await this.parkingRepository.save(vehicle);
    }

    async parkingExit(id: string) {
        const vehicle = await this.parkingRepository.findOne({
            where: { plate: id },
        });

        if (!vehicle) {
            throw new Error('Veículo não encontrado.');
        }

        if (!vehicle.paid) {
            throw new Error('Saída liberada somente após o pagamento.');
        }

        vehicle.left = true;

        await this.parkingRepository.save(vehicle);
    }
}

export { ParkingService };
