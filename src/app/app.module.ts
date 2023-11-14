import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { taskRepository } from './core/tasks/interfaces/task.repository';
import { TaskStorageService } from './infrastructure/task/TaskStorage.service';

import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { TaskTrelloService } from './infrastructure/task/Task-trello.service';
import { TokenInterceptorService } from './infrastructure/token-interceptor.servive';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              { provide : taskRepository, useClass: TaskTrelloService},
              { provide : HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
            ],
  bootstrap: [AppComponent],
})
export class AppModule {}
