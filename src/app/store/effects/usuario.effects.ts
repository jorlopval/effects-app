import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of, tap } from 'rxjs';
import * as usuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { catchError, map } from 'rxjs/operators';
import { cargarUsuariosSuccess } from '../actions/usuarios.actions';



@Injectable()
export class UsuarioEffects {

  constructor(
    private action$: Actions,
    private usuarioService: UsuarioService
  ) {}


  cargarUsuario$ = createEffect(
      () => this.action$.pipe(
          ofType( usuariosActions.cargarUsuario ),
          mergeMap(
            ( action ) => this.usuarioService.getUserById( action.id )
                .pipe(
                    map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                    catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })) )
                )
          )
      )

  );

}
