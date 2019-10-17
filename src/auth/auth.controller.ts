import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    public signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(credentials);
    }
}
