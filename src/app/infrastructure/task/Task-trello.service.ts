import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Task } from "src/app/core/tasks/entities/task";
import { taskRepository } from "src/app/core/tasks/interfaces/task.repository";




const API_URL = 'https://api.trello.com/1/';
const API_KEY = 'f40b8a6ef79615e3fb983f7ecf12ec47';
const API_TOKEN = 'ATTA2a175f0b26058b02eb709a85ec4162478ddce550db50a28a078dee322c4588c8326519D4'; 
const ID_LIST = '65389574d901b9b8843ad4af';




@Injectable({providedIn: 'root'})

export class TaskTrelloService implements taskRepository {
 // private apiKey = 'f40b8a6ef79615e3fb983f7ecf12ec47';
  //private token = 'ATTA2a175f0b26058b02eb709a85ec4162478ddce550db50a28a078dee322c4588c8326519D4'; 
  //private baseUrl = 'https://api.trello.com/1';

  storage: any;  
  constructor(private http:HttpClient) {}
  
  //CREATE
    async createTask(task: Task): Promise<any> {
        console.log(task)
        const data = {
            idList: ID_LIST,
            name: task.nombre,
            desc: task.descripcion
        };

        //return await this.http.post(`${API_URL}/cards`, data).toPromise();
        
        const url = `${API_URL}cards?key=${API_KEY}&token=${API_TOKEN}`;
        const response: any = await this.http.post(url, data).toPromise();
    
        if (response && response.id) {
          let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
          tasks.push({
            id: response.id,
            nombre: task.nombre,
            descripcion: task.descripcion,
            prioridad: 'ALTA',
            estado: true, 
          });
          localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
          throw new Error('Method not implemented.');
        }
    }
    
    //GET
      async getTask(): Promise<Task[]> {
      const url = `${API_URL}lists/${ID_LIST}/cards?key=${API_KEY}&token=${API_TOKEN}`;
      const response: any = await this.http.get(url).toPromise();
      const tasks: Task[] = response.map((card: any) => ({
        id: card.id,
        nombre: card.name,
        descripcion: card.desc,
        prioridad: 'ALTA', 
        estado: true, 
      }));
    
      return tasks;
    }

// GET BY ID
    /* async getTaskById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    } */

    async getTaskById(id: string): Promise<Task | null> {
      const url = `${API_URL}cards/${id}?key=${API_KEY}&token=${API_TOKEN}`;
      try {
        const response: any = await this.http.get(url).toPromise();
        if (response) {
          return {
            id: response.id,
            nombre: response.name,
            descripcion: response.desc,
            prioridad: 'ALTA',
            estado: true,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error al obtener la tarea por ID:', error);
        return null;
      }
    }
    




//UPDATE
    async updateTask(task: Task): Promise<Task> {
      const url = `${API_URL}cards/${task.id}?key=${API_KEY}&token=${API_TOKEN}`;
      const data = {
        name: task.nombre,
        desc: task.descripcion,
      };

      try {
        const response: any = await this.http.put(url, data).toPromise();

        if (response && response.id) {
          
          let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
          const index = tasks.findIndex(t => t.id === task.id);

          if (index !== -1) {
            tasks[index] = {
              id: response.id,
              nombre: task.nombre,
              descripcion: task.descripcion,
              prioridad: 'ALTA',
              estado: true,
            };

            localStorage.setItem('tasks', JSON.stringify(tasks));
            return tasks[index];
          }
        }
      
        console.error('Method not implemented', response);
        throw new Error('Method not implemented');
      } catch (error) {
        console.error('Method not implemented', error);
        throw error;
      }
    }



//DELETE

    async deleteTask(id: string): Promise<void> {
      const url = `https://api.trello.com/1/cards/${id}?key=b019a05d117db6aee5e5a627439f701e&token=ATTA7ae4e8abb166f0698ddc19146e486eb7a3722997853ab4d245972ff8b0003b2c356006E0`;
      const response = await this.http.delete(url).toPromise();
  
    if (response) {
      } else {
        throw new Error("Method not implemented.");
    }
  }


/*   async getCardsInList(listId: string): Promise<any> {
    const url = `${this.baseUrl}/lists/${listId}/cards?key=${this.apiKey}&token=${this.token}`;
    
    return axios.get(url);
  }

  async updateCard(cardId: string, name: string): Promise<any> {
    const url = `${this.baseUrl}/cards/${cardId}`;
    const data = {
      name: name,
      key: this.apiKey,
      token: this.token
    };

    return axios.put(url, data);
  }

  async deleteCard(cardId: string): Promise<any> {
    const url = `${this.baseUrl}/cards/${cardId}?key=${this.apiKey}&token=${this.token}`;

    return axios.delete(url);
  } */
}

