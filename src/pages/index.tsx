import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head"

import styles from '../../styles/Home.module.scss';

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { canSSSRGuest } from "@/utils/canSSRGuest";

import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const {signIn} = useContext(AuthContext);

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(login === '' || senha === ''){
      toast.warn("Preeencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      login,
      senha
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Hackaton - Login</title>
      </Head>
        <div className="container m-0 p-0" id={styles.container}>
          <div className="row">
            <div className="col-sm-7" id={styles.logo}>
              <img src="./titulo.png" alt="titulo" className="img-fluid p-5"/>    
              <div className="conatainer">
                <div className="row m-1">
                  <div className="col-sm-3">
                    <img src="./image-2.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-3.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-4.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-5.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-sm-3">
                    <img src="./image-6.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-7.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-8.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                  <div className="col-sm-3">
                    <img src="./image-9.png" alt="titulo" className="img-fluid p-3"/>
                  </div>
                </div> 
              </div>
            </div>
            <div className="col-sm-5">
              <div className="container">
                <div className="row">
                  <p id={styles.roxo} className="fs-4 mt-5">Olá! <span className="fs-1"><br/>Seja Bem-Vindo!</span></p> 
                </div>
                <div className="row card p-5 m-5 text-center">  
                  <p className="fs-3">Entre na sua <span id={styles.roxo}>Conta:</span></p>
                  <form onSubmit={handleLogin}>
                    <div className="container">
                      <div className="row mb-5">
                        <Input 
                          placeholder="Usuário"
                          type="text"
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                          />
                      </div>
                      <div className="row mb-5">
                        <Input 
                          placeholder="Senha"
                          type="password"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          />
                      </div>
                      <div className="row justify-content-center">
                      <button type="submit" className={styles.button}>
                        LOGIN
                      </button>
                      </div>
                    </div>
                  </form>
                </div>
                </div>
            </div>  
          </div>
        </div>

        <div className="container" id={styles.container_formulario}>
          <form onSubmit={handleLogin}>   
            <div className="row">
              <p id={styles.roxo} className="fs-4 mt-5">Olá! <span className="fs-1"><br/>Seja Bem-Vindo!</span></p> 
            </div>
            <div className="row card p-5 m-5 text-center">  
              <p className="fs-3">Entre na sua <span id={styles.roxo}>Conta:</span></p>
              
                <div className="container">
                  <div className="row mb-5">
                    <Input 
                      placeholder="Usuário"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      />
                  </div>
                  <div className="row mb-5">
                    <Input 
                      placeholder="Senha"
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      />
                  </div>
                  <div className="row justify-content-center">
                  <button type="submit" className={styles.button}>
                    LOGIN
                  </button>
                  </div>
                </div>
            </div>
          </form>
        </div>
    </>  
  )
}


export const getServerSideProps = canSSSRGuest(async (ctx) => {
  return{
    props: {}
  }
})
