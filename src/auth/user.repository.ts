import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(authDto: AuthCredentialsDto): Promise<void> {
        const { password, username } = authDto;

        const salt = await bcrypt.genSalt();

        const user = new User(username, await this.hashPassword(password, salt));

        try {
            await this.save(user);
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('User with this username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    public async signIn(authDto: AuthCredentialsDto): Promise<string> {
        const { password, username } = authDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return 'true logged in';
        } else {
            return 'incorrect credentials';
        }
    }

    protected async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
