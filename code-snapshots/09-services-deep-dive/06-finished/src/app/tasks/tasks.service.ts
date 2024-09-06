import { Injectable, inject, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root', // na mundeson ta perdorim kete servis ne cdo komponent apo servis tjeter duke e injektuar diku tjeter.
// })
export class TasksService {
  private tasks = signal<Task[]>([]); // krijojme nje signal per te regjistruar objekte ne array Task
  private loggingService = inject(LoggingService); // 

  // - Menaxhimi i te dhenave nga Angulari ne lidhje me 'signal' nuk na sygjeron qe 'tasks = signal<Task[]>([]);' te jet publick, ku ne
  // te ne te marim te dhenat ne kohe reale, ai na sygjeron qe 'tasks = signal<Task[]>([]);' te jet private dhe te dhenat ti terheqim 
  // nga sintaksa ' asReadonly() '.
  allTasks = this.tasks.asReadonly(); // marim te gjitha vlerat qe regjistrojme ne signal

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,// spread operator, copy paste vlerat qe vin nga komponenti
      id: Math.random().toString(), // random id
      status: 'OPEN', 
    };
    // ...oldTasks -> copy pasta vlerat qe kemi nese array eshte i mbushur + newTask
    this.tasks.update((oldTasks) => [...oldTasks, newTask]); // updetojme Task Array duke shtuar objektet e reja brenda objekteve te vjetra.
    // console.log new date and message
    this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => // dua te updetojme stattus task te nje signal
      oldTasks.map((task) => // nga qe eshte nje array me objekte perdorim map function ti lexoj objektet nje nga nje brenda array
       // nese id eshte e barabarte, copy - pasta vlerat brenda objektit '...task' dhe updetojme status, 
       // nese id nuk gjendet nga map() fuction, Array Task me objekt nuk i shtyshon vlerat, pra newStatus.
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log('CHANGE TASK STATUS TO ' + newStatus);
  }
}
