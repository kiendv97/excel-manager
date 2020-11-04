import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDTO } from './dto/create';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/create') 
  async createUser(@Res() res, @Body() body: CreateUserDTO ) {
    let createdUser  = await this.userService.createUser(body)
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      data: createdUser
    })
  }

  @Get('/lists')
  async listsUser(@Res() res, @Body() body: CreateUserDTO ) {
    let lists = await this.userService.findAll()
    return res.status(HttpStatus.OK).json({
      message: 'success',
      data: lists
    })
  }
}
