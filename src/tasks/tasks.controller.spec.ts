import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  // Mock do TasksService. Simulamos o que cada método deve retornar.
  const testUuid = 'a-uuid';
  const mockTask = {
    id: testUuid,
    title: 'Test Task',
    description: 'Test Description',
    isDone: false,
    createdAt: new Date(),
  };

  const mockTasksService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn((dto) => ({
      id: testUuid,
      ...dto,
      createdAt: new Date(),
      isDone: false,
    })),
    findOne: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn((id, dto) => ({ ...mockTask, ...dto })),
    remove: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    Object.values(mockTasksService).forEach(mockFn => mockFn.mockClear());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    expect(await controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'New Desc',
    };
    expect(await controller.create(createTaskDto)).toEqual({
      id: testUuid,
      ...createTaskDto,
      createdAt: expect.any(Date),
      isDone: false,
    });
    expect(service.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('should find one task', async () => {
    expect(await controller.findOne(testUuid)).toEqual(mockTask);
    expect(service.findOne).toHaveBeenCalledWith(testUuid);
  });

  it('should update a task', async () => {
    const updateDto = { title: 'Updated' };
    expect(await controller.update(testUuid, updateDto)).toEqual({
      ...mockTask,
      ...updateDto,
    });
    expect(service.update).toHaveBeenCalledWith(testUuid, updateDto);
  });

  it('should remove a task', async () => {
    expect(await controller.remove(testUuid)).toEqual(mockTask);
    expect(service.remove).toHaveBeenCalledWith(testUuid);
  });
});
