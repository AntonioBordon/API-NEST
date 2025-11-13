import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    title: string;  

    @Column({type: 'text', nullable: true})
    description: string;
    
    @Column({default: false})
    isDone: boolean;

    @CreateDateColumn()
    createdAt: Date;    
}
