import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async createUser(createUserContext: CreateUserDTO ): Promise<User> {
      const createUser = new this.userModel(createUserContext)
      return createUser.save()
    }
    async findAll(): Promise<User[]> {
      return this.userModel.find().exec()
    }
    async findOne(username: String): Promise<User> {
      return this.userModel.findOne({username: username}).exec()
    }
}
