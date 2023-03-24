import { useSelector } from "react-redux"
import { NavBar } from "../../components/NavBar"


export const HomeLayout = ({ children }) => {
    const { provider, userVerifyEmail } = useSelector(state => state.auth);
    return (
        <>
            <NavBar />
            &nbsp; {/* separacion */}

            <div className='container' >
                {/* {
                    (provider != 'phone' && userVerifyEmail == false)
                        ?
                        <div class="alert alert-danger" role="alert">
                            <strong>Oh snap!</strong> Debes verificar tu correo
                        </div>
                        : <>{children}</>
                } */}
                {children}
            </div>
        </>
    )
}
