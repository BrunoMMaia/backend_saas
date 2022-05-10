import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('customer')
class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    register_number: string;

    @Column()
    state_registration: string;

    @Column()
    name_responsible: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    zipcode: string;

    @Column()
    address: string;

    @Column()
    number: number;

    @Column()
    complement: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
