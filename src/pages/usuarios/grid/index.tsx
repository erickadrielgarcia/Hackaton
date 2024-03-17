import { Header } from "@/components/Header";
import Head from "next/head";
import style  from './styles.module.scss';
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useRouter } from "next/router";
import { PesquisaUsuario } from "@/components/PesquisaUsuario";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Grid(){
    const router = useRouter();
    const [searchData, setSearchData] = useState([]);

    const {excluiUsuario} = useContext(AuthContext)

    const apiClient = setupAPIClient();

    useEffect(() => {
        const fetchData = async () => {
          const { pesq1, pesq2, pesq3 } = router.query;
    
          try {
            const pesq3String = pesq3 ? pesq3.toString() : '';
            const response = await apiClient.get(`/usuario/pesquisa?pesq1=${pesq1}&pesq2=${pesq2}&pesq3=${pesq3String}`);
            const searchData = response.data;

            setSearchData(searchData);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        fetchData();
    }, [router.query]);
    

    async function handleExcluiUsuario(idUsuario: number) {
        await excluiUsuario({ id: idUsuario });
    }

    function handleDetalhesUsuario(idDetalhes: number) {
        router.push(`/usuarios/detalhes/${idDetalhes}`)
    }

    return(
        <>
            <Head>
                <title>Usuario</title>
            </Head>
            <Header/>
            <div className="container">
                <h1 className="fs-2 mt-4">USUÁRIO</h1>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-header" id={style.card}>
                        <PesquisaUsuario/>
                    </div>
                    <div className="card-body">
                        <div className="card container" id={style.rolagem}>                            
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Operações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchData.map(item => (              
                                        <tr key={item.id}>
                                            <td scope="row">
                                                {item.nome}
                                            </td>
                                            <td>
                                                {item.status == "A" ? "Ativo" : "Inativo"} 
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleExcluiUsuario(Number(item.id))}>
                                                    Exluir
                                                </button> 
                                                &nbsp;
                                                <button className="btn btn-success btn-sm" onClick={() => handleDetalhesUsuario(Number(item.id))}>
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}                                
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
   
    return{
        props:{
        }
    }
})