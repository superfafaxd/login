import { Link, NavLink } from "react-router-dom"
import { useAuthStore } from "../../hooks/store/useAuthStore"
import { useForm } from "../../hooks/useForm"
import './styles2.css'

const initialFormFields = {
    email: '',
    password: ''
}

export const AuthWithEmailAndGoogle = () => {
    const { email, password, onInputChange } = useForm(initialFormFields);
    const { startLoginWithEmailPassword,startSignInWithGoogle } = useAuthStore();

    const onSubmitForm = (event) => {
        event.preventDefault();
        startLoginWithEmailPassword({email, password})
        //console.log({email, password})
    }

    const onGoogleSignIn = () =>{
        console.log('onGoogleSingIn');
        startSignInWithGoogle()
    }

    return (

        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmitForm}>
                <div className="form-group mb-2" >
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Correo"
                        name="email"
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
                         onClick={ onGoogleSignIn}
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
        </div>
    )
}
