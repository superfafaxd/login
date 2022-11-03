import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useAuthStore } from "../../hooks/store/useAuthStore"
import { useForm } from "../../hooks/useForm"
import { AlertError } from "../../ui/components/AlertError"
import './styles2.css'

const initialFormFields = {
    email: '',
    password: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'Ingresa un correo valido.'],
    password: [(value) => value.length > 0, 'Debes Completar la contraseña.']

}

export const AuthWithEmailAndGoogle = () => {
    const {
        email, password, onInputChange,
        isFormValid, emailValid, passwordValid
    } = useForm(initialFormFields, formValidations);
    const { startLoginWithEmailPassword, startSignInWithGoogle } = useAuthStore();
    const { errorMessage } = useSelector(state => state.auth)

    const onSubmitForm = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            console.log({ emailValid, passwordValid })
            return
        }
        startLoginWithEmailPassword({ email, password })
    }

    const onGoogleSignIn = () => {
        console.log('onGoogleSingIn');
        startSignInWithGoogle()
    }

    return (

        <div>
            <h3>Login</h3>
            <form  /* className="was-validated" */ onSubmit={onSubmitForm}>
                <div className="form-group mb-2" >
                    <input
                        type='email'
                        className="form-control"
                        placeholder="Correo"
                        name="email"
                        id="validationTextarea"
                        required
                        value={email}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group mb-2" >
                    <input
                        type='password'
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        id="validationPass"
                        required
                        value={password}
                        onChange={onInputChange}
                    />
                </div>
                <div className="btn-group d-flex justify-content-between pt-2" role="group" >
                    <div className="d-grip gap-2" >
                        <input
                            type='submit'
                            className="btn btn-secondary "
                            value="Login"
                        />
                    </div>

                    <div className="d-grip gap-2" >

                        <NavLink
                            className="btn btn-secondary"
                            to="/Carrito"
                            onClick={onGoogleSignIn}
                        >GOOGLE</NavLink>

                    </div>
                    <div className="d-grip gap-2 " >

                        <NavLink
                            className="btn btn-secondary"
                            to="/auth/register_with_number"
                        >TELEFONO</NavLink>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <NavLink to='/auth/register'  > Crear una Cuenta</NavLink>
                </div>


            </form>

            {
                (errorMessage != null) ? <AlertError mensaje="error" errorMessage={errorMessage} /> : <></>
            }
        </div>
    )
}
