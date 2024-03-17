import Head from "next/head";
import { useState, FormEvent} from "react";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { Header } from "@/components/Header"
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { canSSRAuth } from "@/utils/canSSRAuth"
import { PesquisaPerfil } from "@/components/PesquisaPerfil";
import { useRouter } from "next/router";
import  style  from './styles.module.scss';

type Perfil = {
    id: number;
    nome: string;
    status: string ;
}

interface PerfilProps {
    perfil: Perfil[]
}

export default function EditarPerfil({perfil}: PerfilProps){
    const { query } = useRouter();
    const id_perfil = query.id;
    
    const array_perfil = perfil.find(item => item.id);

    console.log(array_perfil)

    const [nome, setNome] = useState(array_perfil.nome || '');
    const [status, setStatus] = useState(array_perfil.status || '');
    
    async function handleEditarPerfil(event: FormEvent) {
        event.preventDefault();

        if(nome === '' || status === ''){
            toast.warning("Preencha todos os campos");
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.put('/perfil/edita', {
            id: Number(id_perfil),
            nome: nome,
            status: status
        });

        toast.success("Pefil atualizado com sucesso")
    } 

    return (
        <>
            <Head>
                <title>Perfil</title>
            </Head>
            <Header/>
            <div className="container">
                <h1 className="fs-2 mt-4">EDITAR PERFIL</h1>
            </div>        
            <div className="container">       
                <div className="card">
                    <div className="card-header" id={style.card}>
                        <PesquisaPerfil/>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleEditarPerfil}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Perfil</label><br/>
                                    <Input
                                        placeholder="Digite o nome"
                                        type="text"
                                        defaultValue={array_perfil.nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    {array_perfil.status == "A" ?
                                    <div className="col-sm-4">
                                        <label>Status</label><br/>
                                        <label className={style.labelStatus}>Ativo</label>
                                        <input
                                        type="radio"
                                        name="rad_status"
                                        value="A"
                                        defaultChecked
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
                                    :
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
                                            defaultChecked
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </div>
                                }
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
    const apiClient = setupAPIClient(context);

    const { query } = context;
    const id = query.id

    const response = await apiClient.get(`/perfil/detalhes?id=${id}`)

    console.log(response.data)

    return{
        props:{
            perfil : response.data
        }
}
})