import Head from "next/head";
import { useState, FormEvent, useContext } from "react";
import { toast } from "react-toastify";
import { Header } from "@/components/Header"
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth"
import { PesquisaPerfil } from "@/components/PesquisaPerfil";
import  style  from './styles.module.scss';

export default function Perfis(){

    const {cadastraPerfil} = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');

    // const [loading, setLoading] = useState(false);

    async function handleCadastroPerfil(event: FormEvent) {
        event.preventDefault();

        if(nome === '' || status === ''){
            toast.warning("Preencha todos os campos");
            return;
        }

        let data = {
            nome,
            status
        }

        await cadastraPerfil(data);
    } 

    return (
        <>
            <Head>
                <title>Usuario</title>
            </Head>
            <Header/>
            <div className="container">
                <h1 className="fs-2 mt-4">INSERIR PERFIL</h1>
            </div>        
                <div className="container">       
                    <div className="card">
                        <div className="card-header" id={style.card}>
                            <PesquisaPerfil/>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleCadastroPerfil}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Perfil</label><br/>
                                        <Input
                                            placeholder="Digite o nome"
                                            type="text"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
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
                                <div className="row">
                                    <div className="col-sm-2">
                                    <label></label><br/>
                                        <Button type="submit">
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