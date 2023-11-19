import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

class ClubEntityMock extends ClubEntity {}

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<ClubEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        {
          provide: getRepositoryToken(ClubEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all clubs', async () => {
    const expectedClubs: ClubEntity[] = [new ClubEntityMock()];
    jest.spyOn(repository, 'find').mockResolvedValue(expectedClubs);

    const result = await service.findAll();

    expect(result).toEqual(expectedClubs);
  });

  it('should find one club by id', async () => {
    const expectedClub: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(expectedClub);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedClub);
  });

  it('should create a new club', async () => {
    const clubToCreate: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    jest.spyOn(repository, 'save').mockResolvedValue(clubToCreate);

    const result = await service.create(clubToCreate);

    expect(result).toEqual(clubToCreate);
  });

  it('should update an existing club', async () => {
    const existingClub: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    const updatedClub: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(existingClub);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedClub);

    const result = await service.update(1, updatedClub);

    expect(result).toEqual(updatedClub);
  });

  it('should delete an existing club', async () => {
    const existingClub: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(existingClub);
    jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

    await expect(service.delete(1)).resolves.not.toThrow();
  });
});
