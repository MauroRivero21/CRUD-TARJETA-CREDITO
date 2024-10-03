import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; 
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [AppComponent, TarjetaCreditoComponent, ButtonComponent], //componentes

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ], // Modulos(compuestos por componentes)
  providers: [],
  bootstrap: [AppComponent], //componente principal
})
export class AppModule {}
