import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // krijojme nje viewChild qe i perket familjes se sinjaleve 
  // per te mar vlerat nga form (ngSubmit)="onAddTask(title.value, description.value)" #form /> 
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // private na mundeson ta perdorim nje funksjon qe therasim vetem ketu brenda keteti komponenti
  // publick na mundeson ta perdorim nje funksjon edhe ketu ne komponent por edhe ne Template

  // si pas injektimit dhe sembullit qe kemi zgjedur ne bootstrapApplication per TasksService kemi dy shembuj te njeta si te therasim funksjonet:
  // 1. private tasksService = inject(TasksServiceToken);
  // 2. @Inject(TasksServiceToken) private tasksService: TasksService
  // te dyja kan te njejtin rezultat.

  constructor( 
    @Inject(TasksServiceToken) private tasksService: TasksService
  ) {}

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({ title, description }); // ndergojme vlerat ne servis
    this.formEl()?.nativeElement.reset(); // pastojme vlerat nga input nuk i dergojme ne servis
  }
}
 