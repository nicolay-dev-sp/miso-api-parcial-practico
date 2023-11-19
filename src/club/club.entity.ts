import { MemberEntity } from '../member/member.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
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
  members: MemberEntity[];
}
