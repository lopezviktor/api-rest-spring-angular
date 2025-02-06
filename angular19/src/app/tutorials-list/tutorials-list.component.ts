import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TutorialServiceService } from '../tutorial-service.service';
import { Tutorial } from '../tutorial';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutorials-list',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './tutorials-list.component.html',
  styleUrl: './tutorials-list.component.css'
})
export class TutorialsListComponent {
tutorials:any[]=[];
allTutorials: any[] = [];
selectedTutorial: any = null;
searchTerm: string = '';

  constructor(private servicio:TutorialServiceService, private router: Router) { }

  ngOnInit() {
    this.loadTutorials();
  }

  // Cargar la lista de tutoriales desde el backend
  loadTutorials() {
    this.servicio.getAll().subscribe({
      next: data => {
        this.allTutorials = data;
        this.tutorials = data;
      },
      error: error => {
        console.log('Error al cargar tutoriales:', error);
      }
    });
  }

  // Filtrar tutoriales segun el termino de busqueda
  filterTutorials(){
    const term = this.searchTerm.toLocaleLowerCase();
    this.tutorials = this.allTutorials.filter(tutorial =>
      tutorial.title.toLocaleLowerCase().includes(term)
    );
  }
  // Seleccionar un tutorial para mostrar detalles
  selectTutorial(tutorial: any) {
    this.selectedTutorial = tutorial;
  }

  // Redirigir a la página de edición del tutorial
  editTutorial() {
    if (this.selectedTutorial && this.selectedTutorial.id) {
      this.router.navigate(['/tutorials', this.selectedTutorial.id]);
    } else {
      console.error('No se puede navegar porque selectedTutorial es null o no tiene ID');
    }
  }
}