import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { Header } from "@/components/Header"
import  style  from './styles.module.scss';
import { setupAPIClient } from "@/services/api";
import { Aba } from "@/components/Abas";
import { PesquisaUsuario } from "@/components/PesquisaUsuario";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Usuario = {
    id: number;
    login: string;
    nome: string;
    status: string;
}

interface UsuarioProps {
    usuario: Usuario[]
}

export default function EditarUsuario({usuario}: UsuarioProps){
    const { query } = useRouter();
    const id_usuario = query.id

    const array_usuario = usuario.find(item => item.id);
    
    const [nome, setNome] = useState(array_usuario.nome || '');
    const [login, setLogin]  = useState(array_usuario.login || '');
    const [status, setStatus] = useState(array_usuario.status || '');
    const [senha, setSenha] = useState('');

    async function handleEditarUsuario(event: FormEvent) {
        event.preventDefault();

        if(nome === '' || login === '' || status === '' || senha === '') {
            toast.warning("Preencha todos os campos");
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.put('/usuario/edita', {
            id: Number(id_usuario),
            nome: nome,
            login: login,
            status: status,
            senha: senha
        });

        toast.success("Usuario atualizado com sucesso")
    }

    return(
        <>
            <Head>
                <title>Usuario</title>
            </Head>
            <Header/>
            <div className="container">
                <div className="fs-2 mt-4">
                    EDITAR USUÁRIO
                </div>
            </div>
                <div className="container">
                    <div className="card">
                        <div className="card-header" id={style.card}>
                        <PesquisaUsuario/>
                        </div>
                        <div className="card-body" id={style.rolagem}>
                            <Aba url="usuarios/detalhes" id={array_usuario.id}/>
                            <form onSubmit={handleEditarUsuario}>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Nome</label><br/>
                                        <Input
                                        placeholder="Digite o nome"
                                        type="text"
                                        defaultValue={array_usuario.nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Login</label><br/>
                                        <Input
                                        placeholder="Digite o login"
                                        type="text"
                                        defaultValue={array_usuario.login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        />
                                    </div>
                                    {array_usuario.status == "A" ?
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
                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <label>Senha</label><br/>
                                        <Input
                                        placeholder="Digite a senha"
                                        type="password"
                                        onChange={(e) => setSenha(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label></label><br/>
                                        <Button type="submit" className="btn btn-success p-1">
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

    const response =  await apiClient.get(`/usuario/detalhes?id=${id}`)

    return{
        props:{
            usuario: response.data
        }
    }
})