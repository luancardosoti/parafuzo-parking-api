module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "postgres",
    database: "parafuzo",
    migrations: ["./src/database/migrations/*.ts"],
    cli: {
        "migrationsDir": "./src/database/migrations",
    }
}