import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    constructor(name: string, password: string) {
        super();
        this.username = name;
        this.password = password;
    }

    @PrimaryGeneratedColumn() id: number;
    @Column() username: string;
    @Column() password: string;

    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
