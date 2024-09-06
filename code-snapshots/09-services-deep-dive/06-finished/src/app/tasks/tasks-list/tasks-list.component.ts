import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent { 

  // inject(TasksServiceToken): This tells Angular to look for the provider that matches the TasksServiceToken (which is registered with the useClass: TasksService), and inject an instance of TasksService.
  private tasksService = inject(TasksServiceToken);

  private selectedFilter = signal<string>('all');

  // edhe ketu ka ber te njejten gje si me lart si ja mer vlerat TaskStatusOptions
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  // computed është një feature e sinjalit, i cili perllogarit algoritmin if - else duke mar vlera asinkron ne kohe reale
  tasks = computed(() => { 
    // Ky switch kontrollon vlerën aktuale të selectedFilter. Në varësi të vlerës ('all', 'open', 
    // 'in-progress', 'done'), ekzekutohet një pjesë e caktuar e kodit.
    switch (this.selectedFilter()) {  

      case 'open': // case 'open': Nëse selectedFilter është 'open', do të filtrohen detyrat dhe do të kthehen vetëm ato që kanë statusin 'OPEN'
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN'); // marim vlerat me status open 

      case 'in-progress': // if in-progress
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS'); // marim vlerat me status in-progres
 
      case 'done': // if done 
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE'); // marim vlerat me status done

      default: // Nëse asnjë nga kushtet e mësipërme nuk është e vërtetë (p.sh., selectedFilter është 'all' ose 
      // një vlerë tjetër që nuk është specifikuar në rastet e mësipërme), do të kthehen të gjitha detyrat.
        return this.tasksService.allTasks();
      
      // Kështu, computed kthen listën e detyrave që përputhen me filtrin e zgjedhur. Përdorimi i signal dhe 
      // computed siguron që lista e detyrave (tasks) të përditësohet automatikisht kur selectedFilter ndryshon.  
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter); // updetojme singal string i cili eshte default all, nga <select /> ne template.
  }
}
