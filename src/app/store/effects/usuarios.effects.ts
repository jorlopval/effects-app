import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of, tap } from 'rxjs';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { catchError, map } from 'rxjs/operators';
import { cargarUsuariosSuccess } from '../actions/usuarios.actions';



@Injectable()
export class UsuariosEffects {

  constructor(
    private action$: Actions,
    private usuarioService: UsuarioService
  ) {}


  cargarUsuarios$ = createEffect(
      () => this.action$.pipe(
          ofType( usuariosActions.cargarUsuarios ),
          mergeMap(
            () => this.usuarioService.getUsers()
                .pipe(
                    map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) ),
                    catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
                )
          )
      )

  );

}
