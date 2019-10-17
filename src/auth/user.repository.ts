import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(authDto: AuthCredentialsDto): Promise<void> {
        const {password, username} = authDto;
        const user = new User();
        user.username = username;
        user.password = password;
        await this.save(user);
    }
}
