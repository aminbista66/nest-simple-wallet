import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredsDTO } from 'src/user/dto/user-credential.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { UnauthorizedException } from '@nestjs/common';
 
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async refreshToken(refreshToken: string) {
    try {
      const palyload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
      return this.getToken({
        userId: palyload.id,
        email: palyload.email,
        username: palyload.username,
      });
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }


  async login(requestBody: UserCredsDTO) {
    const user = await this.usersRepository.findOneBy({
      username: requestBody.username,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await argon.verify(
      user.password,
      requestBody.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.getToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  }

  async logout(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
    const user_object = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    }
    return {
      message: 'Successfully logged out',
      access_token: await this.jwtService.signAsync(user_object, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1s',
      }),
      refresh_token: await this.jwtService.signAsync(user_object, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1s',
      })
    }
  }

  async getToken(
    payload: Object,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
    return {
      access_token: accessToken,

      refresh_token: refreshToken,
    };
  }
}
