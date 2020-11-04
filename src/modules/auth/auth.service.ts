import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { userLogin } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: String, pwd: String): Promise<any> {
        const user = await this.usersService.findOne(username);
        if(user && user.pwd === pwd) {
            return user
        }
        return null
    }

    async login(user: userLogin) {
        const payload = {user: user.username, pwd: user.pwd}
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
