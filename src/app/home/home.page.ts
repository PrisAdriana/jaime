import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { GetTaskUseCase } from '../core/tasks/use-cases/GetTaskUseCase';
import { CreateTaskUseCase } from '../core/tasks/use-cases/CreateTaskUseCase';
import { EditTaskUseCase } from '../core/tasks/use-cases/EditTaskUseCase'; 
import { DeleteTaskUseCase } from '../core/tasks/use-cases/DeleteTaskUseCase';
import { TaskTrelloService } from '../infrastructure/task/Task-trello.service';

interface tarea {
  id: string;
  nombre: string;
  descripcion: string;
  prioridad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonModal) modal!: IonModal;
  tareas: tarea[] = [];

  tareaEditada: tarea | null = null;

  nombre: string = "";
  descripcion: string = "";
  prioridad: string = "";

  constructor(
    private modalController: ModalController,
    private getTaskUseCase: GetTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase, 
    private deleteTaskUseCase: DeleteTaskUseCase,
    
    
  ) {}

  async ngOnInit() {
    this.tareas = await this.getTaskUseCase.execute();

      /* const tareasLocales = await this.getTaskUseCase.execute();
      this.tareas = [...tareasLocales, ...tareasTrello.map((tareaTrello: any) => ({
        id: tareaTrello.id,
        nombre: tareaTrello.name,
        descripcion: tareaTrello.descripcion, 
        prioridad: tareaTrello.prioridad 
      }))]; */
    
  }

  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.tareaEditada) {
      
      this.tareaEditada.nombre = this.nombre;
      this.tareaEditada.descripcion = this.descripcion;
      this.tareaEditada.prioridad = this.prioridad;


      await this.editTaskUseCase.execute(
        this.tareaEditada.id,
        this.nombre,
        this.descripcion,
        this.prioridad
      );

    } else {
  
      await this.createTaskUseCase.execute(
        this.nombre,
        this.descripcion,
        this.prioridad
      );
      this.tareas = await this.getTaskUseCase.execute();
    }


    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.tareaEditada = null;


    this.modal.dismiss('confirm');
  }

  eliminarTarea(item: any) {
    const index = this.tareas.indexOf(item);
    this.tareas.splice(index, 1);
  }

  editarTareas(item: tarea) {
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
  }



async deleteTask(id: string){
  await this.deleteTaskUseCase.execute(id);  
  }

}