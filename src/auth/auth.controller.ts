import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredsDTO } from 'src/user/dto/user-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('refresh-token')
    async refreshToken(@Body() body: {refreshToken: string}) {
        return this.authService.refreshToken(body.refreshToken);
    }

    @Post('login')
    login(@Body() requestBody: UserCredsDTO) {
      return this.authService.login(requestBody);
    }
  
    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    logout(@Req() request: Request) {
      const token = request.headers
      console.log(token)
      return this.authService.logout("token");
    }
}
