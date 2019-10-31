import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(authDto: AuthCredentialsDto): Promise<void> {
        const { password, username } = authDto;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await this.save(user);
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('User with this username already exists');
            }
        }
    }
}
