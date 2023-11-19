import { ClubEntity } from '../club/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  birthday: Date;

  @ManyToMany(() => ClubEntity, (club) => club.members)
  clubs: ClubEntity[];
}
