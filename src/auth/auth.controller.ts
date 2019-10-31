import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    public async signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(credentials);
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    public async signIn(@Body() credentials: AuthCredentialsDto) {
        return this.authService.signIn(credentials);
    }
}
