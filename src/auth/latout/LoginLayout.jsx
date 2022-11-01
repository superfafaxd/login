import '../pages/styles2.css'


export const LoginLayout = ({ children }) => {
    return (
        <div className="container login-container">
            <div className='row d-flex justify-content-center' >
                <div className='col-md-6 login-form'>
                    {children}
                </div>
            </div>
        </div>
    )
}
