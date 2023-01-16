import { Controller, Get, Req, UseGuards, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name)
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() request) {
    this.logger.log("/me")
    const userId = request.user.userId;
    const user = await this.userService.findOne(userId);
    const {password,...profile} = user
    return profile
  }
}
