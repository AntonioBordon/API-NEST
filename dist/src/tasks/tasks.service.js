"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    create(createTaskDto) {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }
    findAll(query) {
        const findOptions = {
            order: {
                createdAt: 'DESC',
            },
        };
        if (query.isDone !== undefined) {
            findOptions.where = {
                isDone: query.isDone === 'true',
            };
        }
        return this.taskRepository.find(findOptions);
    }
    async findOne(id) {
        const task = await this.taskRepository.findOneBy({ id: id });
        if (!task) {
            throw new common_1.NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.findOne(id);
        task.title = updateTaskDto.title ?? task.title;
        task.description = updateTaskDto.description ?? task.description;
        task.isDone = updateTaskDto.isDone ?? task.isDone;
        return this.taskRepository.save(task);
    }
    async remove(id) {
        const task = await this.findOne(id);
        return this.taskRepository.remove(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map