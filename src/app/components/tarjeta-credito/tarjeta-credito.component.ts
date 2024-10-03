import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent {
  listTarjetas: any = [];

  form: FormGroup;
  accion = 'Agregar';
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
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

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListarTarjetas().subscribe({
      next: (data) => {
        console.log(data);
        this.listTarjetas = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  guardarTarjeta() {
    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(
        (data) => {
          this.toastr.success(
            'La tarjeta fue registrada con exito!',
            'tarjeta Registrada'
          );
          this.obtenerTarjetas();
          this.form.reset();
        },
        (error) => {
          this.toastr.error('Ops.. ocurrio un error', 'Error');
        }
      );
    } else {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info(
            'La tarjeta fue actualizada con exito',
            'Tarjeta Actualizada'
          );
          this.obtenerTarjetas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eliminarTarjeta(id: number) {
    console.log('ID de tarjeta a eliminar:', id);
    this._tarjetaService.deleteTarjeta(id).subscribe({
      next: (data) => {
        this.toastr.success(
          'La tarjeta fue eliminada con éxito',
          'Tarjeta eliminada'
        );
        this.obtenerTarjetas();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('No se pudo eliminar la tarjeta', 'Error');
      },
    });
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }
}
