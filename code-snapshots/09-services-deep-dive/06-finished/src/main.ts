import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { taskStatusOptionsProvider } from './app/tasks/task.model';

export const TasksServiceToken = new InjectionToken<TasksService>( // 1 injektojme TaskService me nje token string
  'tasks-service-token'
);

// Platform EnvironmentInjector level -> quhet kur e injektojme resviset ketu ne main.ts, qe te jet e aksesushme ne te gjith application.
// ElementInjector -> quhet, kur nuk e kemi injektuar ne as nje vend, dhe nga metoda ElementInjector na mundesojme ta injektojme servisin ne komponentin qe po punojme ose na duhet.

// ??? pse e ka shtuar keshtu providers ??? -> nga qe nuk kemi @NgModule per te injetuar, componetet ose services 
// githashtu @Injectable({ providedIn: 'root'  }) e kemi fshir nga TasksService i cili na mundesonte ta therisnim servisin ne cdo componet ne projekt
// duke mos pasur @NgModule, @Injectable ose providers: [TasksService] brenda @Component({}), alternativa e 4 eshte kjo
bootstrapApplication(AppComponent, { 

  // provide: TasksServiceToken: This tells Angular that whenever something requests TasksServiceToken, Angular should provide the TasksService class.
  // useClass: TasksService: This specifies that Angular should create an instance of TasksService when the token is requested.

  providers: [{ provide: TasksServiceToken, useClass: TasksService }], 
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch(
//   (err) => console.error(err)
// );
