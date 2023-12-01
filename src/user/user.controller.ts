import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() requestBody: UserCreateDTO) {
    return this.userService.createUser(requestBody);
  }



}
