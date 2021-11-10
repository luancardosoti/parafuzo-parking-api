import { EntityRepository, Repository } from "typeorm";

import { Parking } from "../Entities/Parking";

@EntityRepository(Parking)
class ParkingRepository extends Repository<Parking> { }

export { ParkingRepository };
