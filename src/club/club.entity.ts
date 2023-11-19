import { MemberEntity } from '../member/member.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => MemberEntity, (member) => member.clubs)
  @JoinTable()
  members: MemberEntity[];
}
