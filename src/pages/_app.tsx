import "../../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


import { AuthProvider } from "@/contexts/AuthContext";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Component {...pageProps} />
      <ToastContainer autoClose={1500} theme="colored" limit={1}/>
    </AuthProvider>
  )
}

export default MyApp