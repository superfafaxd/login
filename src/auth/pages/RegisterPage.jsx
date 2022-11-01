import { useState } from "react"
import { useDispatch } from "react-redux"
import {Link, NavLink } from "react-router-dom"
import { useAuthStore } from "../../hooks/store/useAuthStore"
import { useForm } from "../../hooks/useForm"
import './styles2.css'

const initialFormFields = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: ''
}
const formValidations = {
  displayName:  [(value) => value.length >= 4, 'El Nombre debe de tener mas de 4 letras'],
  email: [(value) => value.includes('@'), 'El Corro no es valido'],
  password:  [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  passwordConfirm:  [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras']
}
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {formState, displayName, email, password, passwordConfirm, onInputChange,
     isFormValid,displayNameValid, emailValid, passwordValid, passwordConfirmValid} = useForm(initialFormFields, formValidations);

     const { startRegisterWithEmailPassword } = useAuthStore();

  const onSubmitForm = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid){
      console.log({displayNameValid, emailValid, passwordValid, passwordConfirmValid})
      return
    } 
    console.log( {displayName, email, password, passwordConfirm})
    startRegisterWithEmailPassword(formState)
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmitForm} >
        <div className="form-group mb-2" >
          <input
            type='text'
            className="form-control"
            placeholder="Nombre Completo"
            name='displayName'
            value={displayName}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mb-2" >
          <input
            type='text'
            className="form-control"
            placeholder="Correo"
            name='email'
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mb-2" >
          <input
            type='password'
            className="form-control"
            placeholder="Password"
            name='password'
            value={password}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mb-2" >
          <input
            type='password'
            className="form-control"
            placeholder="Confirmar Password"
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={onInputChange}
          />
        </div>

        <div className="d-grip gap-2"  >
          <input
            type='submit'
            className="col-12 btn btn-secondary btnSubmit d-flex justify-content-center"
            value="Crear Cuenta"
          />

        </div>

        <div className="d-flex justify-content-end mt-3">
        <span>Ya Tienes Cuenta?</span>
        <div className="me-2"></div>
          <NavLink to='/auth/login'  >Ingresar</NavLink>
        </div>
      </form>
    </div>
  )
}
