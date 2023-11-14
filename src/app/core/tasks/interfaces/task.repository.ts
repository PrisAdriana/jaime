import { Task } from "../entities/task";

export abstract class taskRepository {
    abstract createTask(Task: Task):Promise<Task>;
    abstract getTask():Promise<Task[]>
    abstract getTaskById(id: string): Promise<Task | null>;
    abstract updateTask(task: Task): Promise<Task>;
    abstract deleteTask(id: string): Promise<void>;
}
