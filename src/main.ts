import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { environment } from '../environment'
import { Message } from './config/message'

async function nestjsApplication() {
  const app = await NestFactory.create(AppModule, {})
  app.enableCors()

  // getting application environment
  const env = process.env.NODE_ENV
  // getting application config based on environment
  const envConfig = environment[env]
  // setting port value
  const port = envConfig.port || 4000

  // global.massage = Message;
  

  await app.listen(port, () =>
    console.log(`Nest Js App with mongoDB listening on port ${port} !`),
  )
}
nestjsApplication()
