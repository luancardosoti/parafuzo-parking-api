import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableParking1636526822685 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "parking",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "plate",
                        type: "varchar",
                    },
                    {
                        name: "paid",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "left",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("parking");
    }
}
