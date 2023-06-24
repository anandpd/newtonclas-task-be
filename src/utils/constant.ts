const CONSTANT = {
    CONNECTION_STRING: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    MODELS: {
        TICKET: "ticket",
        CUSTOMER: "customer",
        MOVIE: "movie"
    },
    LOGGING: {
        SERVER: {
            SUCCESS: "Server is up and running.",
            FAILURE: "Server failed to connect."
        },
        DATABASE: {
            SUCCESS: "DB connected successfully.",
            FAILURE: "DB connection failure.",
            SYNC: "All Tables synced.",
            DIALECT: "postgres"
        },
        API: {
            SUCCESS: "Success",
            FAILURE: "Failure"
        }
    },
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    HTTP_METHODS: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    }
}

export { CONSTANT };