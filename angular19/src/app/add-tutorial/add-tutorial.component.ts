import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TutorialServiceService } from '../tutorial-service.service';

@Component({
  selector: 'app-add-tutorial',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tutorial.component.html',
  styleUrl: './add-tutorial.component.css'
})
export class AddTutorialComponent {

  tutorialForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    published: new FormControl(false)
  });

  constructor(private servicio:TutorialServiceService) { }
  
  saveTutorial(){
    const data = this.tutorialForm.value;

    this.servicio.create(data).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
    this.tutorialForm.reset();
  }//cierra saveTutorial
}//cierra clase
