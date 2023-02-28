export default {
    info: {
        version: "1.0.0",
        title: "API Documentation",
        description: "Job Board API documentation.",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        }
    },
    security: {
        Bearer: {
            type: "apiKey",
            in: "header",
            name: "Authorization"
        }
    },
    baseDir: __dirname,
    filesPattern: ["./**/*.route.js"],
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: "/json-api-docs",
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
}