import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  providers: [AuthService],
  imports: [UsersModule, 
    JwtModule.register({
      secret: 'SECRET_AUTH',
      signOptions: {expiresIn: '10000'}
    })
  ],
})
export class AuthModule {}
