import { useSelector } from "react-redux"
import { FirebaseAuth } from "../../firebase/config"

export const CkeckingAuth = () => {

  // const { userVerifyEmail } = useSelector(state => state.auth);

  // if (!userVerifyEmail) {
  //   setTimeout(() => {
  //     window.location.reload()
  //   }, 30);
  // }

  return (
    <div className="container login-container">
      <div className='row d-flex justify-content-center' >
        <div className="col-md-6  loader-container">
          <div className="spinner-grow loading" role="status"></div>
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  )
}


