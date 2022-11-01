import { useAuthStore } from '../../hooks/store/useAuthStore'


export const HomePage = () => {
  const {startLogout } = useAuthStore();
  const onSubmit = () => {
    //dispatch(logout())
    startLogout();
    console.log('Logout exitoso')
  }
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={ onSubmit} >logout</button>
    </div>

  )
}
