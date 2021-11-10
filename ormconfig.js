module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "parafuzo",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/app/Entities/**.ts"],
    cli: {
        "migrationsDir": "./src/database/migrations",
    }
}