declare namespace HttpRequest {
    interface IHandleResponse {
        statusCode?: number
        success?: boolean,
        message?: string,
        data?: any,
    }
    interface IHttpMethods {
        GET: string,
        POST: string,
        PUT: string,
        DELETE: string
    }
}