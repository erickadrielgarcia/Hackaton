import { Header } from "@/components/Header";
import Head from "next/head";
import style  from './styles.module.scss';
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useRouter } from "next/router";
import { PesquisaPerfil } from "@/components/PesquisaPerfil";
import { useState, useEffect, useContext } from "react";
import { setupAPIClient } from "@/services/api";
import { AuthContext } from "@/contexts/AuthContext";

export default function Grid(){
    const router = useRouter();
    const [searchData, setSearchData] = useState([]);

    const apiClient = setupAPIClient();

    const {excluiPerfil} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
          const { pesq1, pesq2 } = router.query;
    
          try {
            const response = await apiClient.get(`/perfil/pesquisa?pesq1=${pesq1}&pesq2=${pesq2}`);
            const searchData = response.data;
    
            
            setSearchData(searchData);
          } catch (error) {
            console.error('Erro ao buscar dados:', error);
          }
        };
    
        fetchData();
    }, [router.query]);
    
    async function handleExcluiPerfil(idPerfil: number) {
        await excluiPerfil({id: idPerfil})
    }

    function handleDetalhesPerfil(idDetalhes: number) {
        router.push(`/perfil/detalhes/${idDetalhes}`)
    }

    return(
        <>
            <Head>
                <title>Perfil</title>
            </Head>
            <Header/>
            <div className="container">
                <h1 className="fs-2 mt-4">PERFIL</h1>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-header" id={style.card}>
                        <PesquisaPerfil/>
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
                                                <button className="btn btn-danger btn-sm" onClick={() => handleExcluiPerfil(Number(item.id))}>
                                                    Exluir
                                                </button> 
                                                &nbsp;
                                                <button className="btn btn-success btn-sm" onClick={() => handleDetalhesPerfil(Number(item.id))}>
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
   
    const apiClient = setupAPIClient(context);
 
    return{
        props:{
        }
    }
})