import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = ""; // Variable para el usuario ingresado
  contrasenia: string = ""; // Variable para la contraseña ingresada
  mensajeError: string = ""; // Variable para mostrar mensajes de error

  constructor(private validar: NavController) { }

  ngOnInit() {
  }



  validarCampos() {
    // Realiza la validación aquí
    if (this.usuario === "admin" && this.contrasenia === "admin") {
      // Validación exitosa, redirige al usuario a la página "home"
      this.validar.navigateForward('/home');
    } else {
      // Validación fallida, muestra un mensaje de error
      this.mensajeError = "Usuario o contraseña incorrectos";
    }
  }

}
