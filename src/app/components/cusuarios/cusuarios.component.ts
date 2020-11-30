import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SusuariosService } from 'src/app/services/catalogo_usuario/susuarios.service';

@Component({
  selector: 'app-cusuarios',
  templateUrl: './cusuarios.component.html',
  styles: [
  ]
})
export class CusuariosComponent implements OnInit {

  // variable para almacenar formulario
  form: FormGroup;
  formData: FormData;
  response: any = [];
  submited: boolean = false;

  usu = {
    nombre:null,
    email:null,
    password:null
  }

  // Getters de los controles
  get validName(){
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get validLastName(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  get validEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }


  constructor( private susuarios: SusuariosService, private fB: FormBuilder ) {
    this.createForm();
  }

  ngOnInit(): void {
    // this.susuarios.recuperarusuarios().then(res =>{
    //   console.log('Usuarios consultados con éxito',res);
    // }).catch(erro=>{
    //   console.log('Ha sucedido un error',erro);
    // });
  }

  // altauser(){
  //   console.log(this.usu)
  //   this.susuarios.altauser(this.usu).then(res=>{
  //     alert(res);
  //   }).catch(erro=>{
  //     console.log(erro)
  //     alert(erro);
  //   });
  // }

  createForm(){
    this.form = this.fB.group({
      // El primer valor ('') representa el valor por defecto de cada control 
      // Como segundo estaremos agregando las validaciones
      name: ['', [ Validators.required, Validators.minLength(4) ]],
      apellido: ['', [ Validators.required, Validators.minLength(4) ]],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]]
    });
  }

  enviar(){
    console.log(this.form);
    if(this.form.invalid) {
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();
        this.submited = false;
      } )
    }else{
      let data = {
        'name': this.form.get('name').value,
        'apellido': this.form.get('apellido').value,
        'email': this.form.get('email').value,
      }
      
    }
  }

  addOther(){
    this.submited = false;
    this.form.reset();
  }

}
