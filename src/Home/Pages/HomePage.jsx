import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageNotVerify } from '../../auth/pages/pageNotVerify';
import { FirebaseAuth } from '../../firebase/config';
import { HomeLayout } from '../../layout/home/HomeLayout';


export const HomePage = () => {
  // let provider
  // const user = FirebaseAuth.currentUser;
  // if (user !== null) {
  //   const { providerData } = user
  //   provider = providerData[0].providerId

  // }
  // console.log(provider)
  
 
  return (
    <HomeLayout >
      <div  >
        <h1>HomePage</h1>
       
      </div>
    </HomeLayout>

  )
}
