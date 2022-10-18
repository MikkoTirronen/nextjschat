import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from '../firebase';
import Login from "./login"
import Loading from '../components/Loading';
import firebase from "firebase/compat/app";
import {useEffect} from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth as any);

  interface CurrentUser {
    email: string;
    lastSeen?: Date;
    photoUrl?: string;
  }

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email as String,
        photoUrl: user.photoURL as String,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },{merge:true})
    }
  
  }, [user]);
  

  if(loading) return <Loading/>
  if(!user) return <Login/>
  return <Component {...pageProps} />
}

export default MyApp
