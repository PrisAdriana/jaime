import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { taskRepository } from "../interfaces/task.repository";

@Injectable({ providedIn: "root" })
export class EditTaskUseCase {
  constructor(private repository: taskRepository) {}

  async execute(taskId: string, nombre: string, descripcion: string, prioridad: string): Promise<Task | null> {
  const existingTask = await this.repository.getTaskById(taskId);

 
  if (existingTask) {
    existingTask.nombre = nombre;
    existingTask.descripcion = descripcion;

    try {
      const updatedTask = await this.repository.updateTask(existingTask);
      return updatedTask;
    } catch (error) {
 
      console.error('Error al actualizar la tarea:', error);
      throw error;
    }
  } else {
    console.error('La tarea no existe.');
    return null;
  }
}
}