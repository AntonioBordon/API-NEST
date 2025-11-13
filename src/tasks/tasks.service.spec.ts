import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const testUuid = 'a-uuid';
  const mockTask = {
    id: testUuid,
    title: 'Test Task',
    description: 'Test Description',
    isDone: false,
    createdAt: new Date(),
  };

  const mockTaskRepository = {
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn((dto) => dto),
    save: jest.fn((task) =>
      Promise.resolve({ id: testUuid, ...task }),
    ),
    findOneBy: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    Object.values(mockTaskRepository).forEach(mockFn => mockFn.mockClear());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };
    const result = await service.create(createTaskDto);

    expect(repository.create).toHaveBeenCalledWith(createTaskDto);
    expect(repository.save).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(expect.objectContaining(createTaskDto));
    expect(result.id).toBeDefined();
  });

  describe('findOne', () => {
    it('should find and return a task by ID', async () => {
      const result = await service.findOne(testUuid);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: testUuid });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task is not found', async () => {
      mockTaskRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateDto = { title: 'Updated Title', isDone: true };
      mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
      mockTaskRepository.save.mockResolvedValue({
        ...mockTask,
        ...updateDto,
      });

      const result = await service.update(testUuid, updateDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: testUuid });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateDto),
      );
      expect(result.title).toEqual(updateDto.title);
      expect(result.isDone).toEqual(true);
    });

    it('should throw NotFoundException if task to update is not found', async () => {
      mockTaskRepository.findOneBy.mockResolvedValue(null);

      const updateDto = { title: 'Updated Title' };
      await expect(service.update('non-existent-id', updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      mockTaskRepository.findOneBy.mockResolvedValue(mockTask);
      const result = await service.remove(testUuid);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: testUuid });
      expect(repository.remove).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTask);
    });
  });
});
