import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";
import { Task } from "src/app/core/tasks/entities/task";
import { taskRepository } from "src/app/core/tasks/interfaces/task.repository";

const COLLECTION = "TASK";

@Injectable({ providedIn: "root" })


export class TaskStorageService implements taskRepository {

  constructor()
  {

  }

  //CREATE  
  async createTask(task: Task): Promise<any> {
    return await Preferences.set({
      key: `${COLLECTION} - ${task.id}`, value: JSON.stringify(task)
    });
  }


  //GET
  async getTask(): Promise<Task[]> {

    
    const collection = await Preferences.keys();
    const task: Task[] = [];

    collection.keys.filter(key => key.startsWith(COLLECTION))
      .forEach(async key => {
        const data = (await Preferences.get(({ key }))).value;
        if (data) task.push(JSON.parse(data));
      })
    return task;
  }



  //GET POR ID

  async getTaskById(id: string): Promise<Task | null> {
    // Implementar la obtención de una tarea por su ID
    const data = (await Preferences.get({ key: `${COLLECTION} - ${id}` })).value;
    return data ? JSON.parse(data) : null;
  }



  //UPDATE
  async updateTask(task: Task): Promise<any> {
    await Preferences.set({ key: `${COLLECTION} - ${task.id}`, value: JSON.stringify(task) });
    return task;
  }



  //DELETE
  async deleteTask(id: string): Promise<void> {
    await Preferences.remove({ key: `${COLLECTION} - ${id}` });

  }

}
