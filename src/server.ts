import { app } from "./app"
import { env } from "./env/index"

app.listen({
    host: "0.0.0.0",
    port: env.PORT
}).then(() => {
    console.log(`Servidor: http://localhost:${env.PORT}`)
    console.log(`\nDocumentação: http://localhost:${env.PORT}/api-docs`)
})