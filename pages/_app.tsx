import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebase';
import Login from "./login"
import Loading from '../components/Loading';


function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth as any);

  if(true) return <Loading/>
  if(!user) return <Login/>
  return <Component {...pageProps} />
}

export default MyApp
