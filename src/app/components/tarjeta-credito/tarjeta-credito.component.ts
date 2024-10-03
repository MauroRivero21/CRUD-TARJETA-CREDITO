import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent {
  listTarjetas: any = [
    {
      titular: 'Juan Perez',
      numeroTarjeta: '25253233',
      fechaExpiracion: '11/23',
      cvv: '123',
    },
    {
      titular: 'Migel Gonzalez',
      numeroTarjeta: '252324141',
      fechaExpiracion: '11/24',
      cvv: '312',
    },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5)]],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  agregarTarjeta() {
    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };
    this.listTarjetas.push(tarjeta);
    this.toastr.success('La tarjeta fue registrada con exito!', 'tarjeta Registrada');
    this.form.reset();
  }

  eliminarTarjeta(index: number) {
    this.listTarjetas.splice(index, 1)
    this.toastr.error('La tarjeta fue eliminada con exito','Tarjeta eliminada')
  }
}
