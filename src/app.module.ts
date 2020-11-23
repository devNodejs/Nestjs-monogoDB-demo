import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './app/user/user.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MorganModule, MorganInterceptor } from 'nest-morgan'
import { AuthModule } from './app/auth/auth.module'
import * as mongoose from 'mongoose'
import { Routes, RouterModule } from 'nest-router'
import { MulterModule } from '@nestjs/platform-express'

const routes: Routes = [
  {
    path: '/useApiRoute',
    module: UserModule,
  },
  {
    path: '/authApiRoute',
    module: AuthModule,
  },
]

@Module({
  imports: [
    MulterModule.register({ dest: '../upload' }),

    // ####################------MONGOOSE--------DATABASE-CONNECTION-------############################################
 // 'mongodb://localhost/nestjs-user-demo?authSource=admin',
    
    MongooseModule.forRoot(
      'mongodb://localhost/nestjs-user-demo',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // user: '',
        // pass: '',
      },
    ),
    MongooseModule.forRoot(mongoose.set('debug', true)),
    MorganModule.forRoot(),
    UserModule,
    AuthModule,
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
