import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    }

    public async signUp(authDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authDto);
    }

    public async signIn(authDto: AuthCredentialsDto) {
        return this.userRepository.signIn(authDto);
    }
}
