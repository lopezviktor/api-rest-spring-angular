import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tutorial } from '../tutorial';
import { TutorialServiceService } from '../tutorial-service.service';

@Component({
  selector: 'app-tutorial-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tutorial-details.component.html',
  styleUrl: './tutorial-details.component.css'
})
export class TutorialDetailsComponent {
  //Definir FormGroup sin validaciones
  tutorialForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    published: new FormControl(0)
  });
  tutorialId: number | null = null;

  constructor(
    private servicio:TutorialServiceService,
    private route:ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(){
    this.tutorialId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTutorial();
  }

  // Cargamos datos del tutorial
  loadTutorial() {
    if (this.tutorialId) {
      this.servicio.get(this.tutorialId).subscribe({
        next: data => {
          if (data) {
            data.published = data.published === true ? 1 : data.published === false ? 0 : 0;

          this.tutorialForm.patchValue({
            title: data.title,
            description: data.description,
            published: data.published
          });
        }
      },
        error: error => {
          console.error('Error al cargar el tutorial:', error);
        }
      });
    }
  }
  updateTutorial() {
    if (this.tutorialId && this.tutorialForm.valid) {
      let tutorialData = this.tutorialForm.value;
  
      // Convertir "published" a 1 o 0 asegurando que no es undefined o null
      tutorialData.published = tutorialData.published ? 1 : 0;
  
      this.servicio.update(this.tutorialId, tutorialData).subscribe({
        next: response => {
          console.log('Tutorial actualizado:', response);
          this.router.navigate(['/tutorials']); // Redirigir a la lista de tutoriales
        },
        error: error => {
          console.log('Error al actualizar:', error);
        }
      });
    }
  }
}