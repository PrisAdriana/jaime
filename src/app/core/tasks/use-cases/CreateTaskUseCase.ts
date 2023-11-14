import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { taskRepository } from "../interfaces/task.repository";

@Injectable ({providedIn: "root"})
export class CreateTaskUseCase {
  constructor(private repository: taskRepository) { }

  async execute(nombre: string, descripcion : string, prioridad: string):  Promise<Task> {

    const id = new Date().toString();

    const estado = false;

    const task = new Task();

    task.id = id;
    task.nombre = nombre;
    task.descripcion = descripcion;
    task.prioridad = prioridad;
    task.estado = estado;

  await this.repository.createTask(task);

  return task;
  }

}
