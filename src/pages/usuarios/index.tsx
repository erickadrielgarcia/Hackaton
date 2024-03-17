import Head from "next/head";
import { useState, FormEvent, useContext } from "react";
import { toast } from "react-toastify";
import { Header } from "@/components/Header"
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth"
import { PesquisaUsuario } from "@/components/PesquisaUsuario"; 
import  style  from './styles.module.scss';

export default function Cadastro(){

    const {cadastrarUsuario} = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [status, setStatus] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleCadastroUsuario(event: FormEvent){
        event.preventDefault();

        if(nome === '' || login === '' || senha === '' || status === ''){ 
            toast.warning("Preencha todos os campos")
            return;
        }
        
        console.log(status);

        setLoading(true);

        let data = {
            nome,
            login,
            senha,
            status
        }

        await cadastrarUsuario(data)

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Usuario</title>
            </Head>
            <Header/>
            <div className="container">
                <h1 className="fs-2 mt-4">INSERIR USUÁRIO</h1>
            </div>
                <div className="container">
                    <div className="card">
                        <div className="card-header" id={style.card}>
                            <PesquisaUsuario/>
                        </div>
                        <div className="card-body" id={style.rolagem}>
                            <form onSubmit={handleCadastroUsuario}>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Nome</label><br/>
                                        <Input
                                        placeholder="Digite o nome"
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Login</label><br/>
                                        <Input
                                        placeholder="Digite o login"
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Status</label><br/>
                                        <label className={style.labelStatus}>Ativo</label>
                                        <input
                                        type="radio"
                                        name="rad_status"
                                        value="A"
                                        onChange={(e) => setStatus(e.target.value)}
                                        />

                                        <label className={style.labelStatus}>Inativo</label>
                                        <input
                                            type="radio"
                                            name="rad_status"
                                            value="I"
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <label>Senha</label><br/>
                                        <Input
                                        placeholder="Digite a senha"
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label></label><br/>
                                        <Button type="submit" loading={loading} className="btn btn-success p-1">
                                            Salvar
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (context) => {
    return{
        props:{}
    }
})