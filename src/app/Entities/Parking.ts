import { Column, Entity } from "typeorm";

import { BaseEntity } from "./BaseEntityId";

@Entity("parking")
class Parking extends BaseEntity {
    @Column()
    plate: string;

    @Column({ default: false })
    paid: boolean;

    @Column({ default: false })
    left: boolean;
}

export { Parking };
