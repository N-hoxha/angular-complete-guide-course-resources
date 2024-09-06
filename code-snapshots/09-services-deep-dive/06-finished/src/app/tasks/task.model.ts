import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

// injektojme nje Token string ne TaskStatusOptions array i cilit i aksesojme nje cels unik string 'task-status-options' na ndimon te terheqim tedhenat: 
// taskStatusOptions = inject(TASK_STATUS_OPTIONS);
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options'
);

export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',  
    text: 'In-Progress', 
  }, 
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  },
];

// Injection token bashke me data array: TaskStatusOptions e bashkagjisim ne nje Provider, 
// per ta injektuar ate ne komponentin ku do ta perdorim @Component({ providers: [taskStatusOptionsProvider] }),
// ose mund ta bashkagjisim ne te gjith platformen: 
// bootstrapApplication(AppComponent, { providers: [{ provide: TasksServiceToken, useClass: TasksService }, taskStatusOptionsProvider] }).catch((err) => console.error(err));

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions // ndryshe nga bootstrapApplication, ketu nuk e kemi useClass por useValue sepse kemi nje array me vlera, kurse TasksService eshte nje class
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
