import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { taskRepository } from "../interfaces/task.repository";

@Injectable ({providedIn: "root"})
export class GetTaskUseCase {
  constructor(private repository: taskRepository) { }

  async execute(): Promise<Task[]> {
    const tasks = await this.repository.getTask();
    return tasks;
  }
}


