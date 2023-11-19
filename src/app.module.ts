import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ClubModule } from './club/club.module';
import { ClubMemberModule } from './club-member/club-member.module';
import { ClubEntity } from './club/club.entity';
import { MemberEntity } from './member/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MemberModule,
    ClubModule,
    ClubMemberModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nicolay.joya',
      password: 'postgres',
      database: 'miso-api-parcial-practico',
      entities: [ClubEntity, MemberEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
