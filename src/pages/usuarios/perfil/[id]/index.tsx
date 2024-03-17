import React, { useState, FormEvent} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { canSSRAuth } from '@/utils/canSSRAuth';
import style from './styles.module.scss';
import { setupAPIClient } from '@/services/api';
import { Aba } from '@/components/Abas';
import { Header } from '@/components/Header';
import { PesquisaUsuario } from '@/components/PesquisaUsuario';
import { Button } from '@/components/Button';
import { toast } from 'react-toastify';

type PerfilTodos = {
  id: number;
  nome: string;
  status: string;
};

interface PerfilProps {
  perfilTodos: PerfilTodos[];
}

type DadosCadastrados = {
  id: number;
  nome: string;
  status: string;
};

interface DadosCadastradosProps {
  dadosCadastrados: DadosCadastrados[];
}

export default function EditarUsuario({ dadosCadastrados, perfilTodos }: { dadosCadastrados: DadosCadastradosProps; perfilTodos: PerfilProps }) {
    const { query } = useRouter();
    const id = query.id;

    const arrayRestantes = perfilTodos.filter(
        item => !dadosCadastrados.some(selectedItem => selectedItem.id === item.id)
    );

    // const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
    const [itensSelecionados, setItensSelecionados] = useState<number[]>(dadosCadastrados.map(item => item.id));

    const handleCheckboxChange = (id: number) => {
        // Verifica se o item já está selecionado
        if (itensSelecionados.includes(id)) {
            // Remove o item da lista de selecionados
            setItensSelecionados(prevSelected => prevSelected.filter(item => item !== id));
        } else {
            // Adiciona o item à lista de selecionados
            setItensSelecionados(prevSelected => [...prevSelected, id]);
        }
    };
    
    async function handleCadastroPerfil(event: FormEvent) {
        event.preventDefault();

        // Extrair os IDs dos objetos no arrayDeObjetos
        const array = dadosCadastrados.map(objeto => objeto.id);

        // Encontrar os números que são diferentes entre array1 e array2
        const numerosDiferentes = [...new Set([...itensSelecionados, ...array])].filter(
            numero => !(itensSelecionados.includes(numero))
        );

        if(numerosDiferentes.length === 0) {
            try {
                const apiClient = setupAPIClient();
                
                itensSelecionados.map(async (item) => (
                    // console.log(item)
                    await apiClient.post('/usuario/perfil', {
                        id_usuario: Number(id),
                        id_perfil: Number(item)
                    })
                ))
                
                // console.log('Dados inseridos com sucesso.');
                toast.success('Dados inseridos com sucesso');
    
            } catch (error) {
                toast.error('Erro ao fazer solicitação');
                console.error('Erro ao fazer a solicitação:', error);
            }

        } else {
            
            try {
                const apiClient = setupAPIClient();

                // console.log(numerosDiferentes);
                numerosDiferentes.map(async (item) => 
                    await apiClient.put('/usuario/perfil/exclui', {
                        id_usuario: Number(id),
                        id_perfil: Number(item)
                    })
                )

                toast.success('Dados inseridos com sucesso');

            } catch (error) {
                toast.error('Erro ao fazer solicitação');
                console.error('Erro ao fazer a solicitação de exclusão:', error);
            }

        }

    };

    return (
    <>
        <Head>
        <title>Usuario</title>
        </Head>
        <Header />
        <div className="container">
        <div className="fs-2 mt-4">INSERIR PERFIL DO USUÁRIO</div>
        </div>
        <div className="container">
        <div className="card">
            <div className="card-header" id={style.card}>
            <PesquisaUsuario/>
            </div>
            <div className="card-body" id={style.rolagem}>
            <form onSubmit={handleCadastroPerfil}>
                <Aba url="usuarios/perfil" id={id} />
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Nome</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosCadastrados.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">
                            <input
                                type="checkbox"
                                name=""
                                id={`checkbox-${item.id}`}
                                checked={itensSelecionados.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            </th>
                            <td>{item.nome}</td>
                            <td>{item.status === 'A' ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    ))}
                    {arrayRestantes.map((item) => 
                        item.status == "A" ?
                        <tr key={item.id}>
                            <th scope="row">
                            <input
                                type="checkbox"
                                name=""
                                id={`checkbox-${item.id}`}
                                checked={itensSelecionados.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            </th>
                            <td>{item.nome}</td>
                            <td>{item.status === 'A' ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                        :
                        <tr key={item.id}>
                            <th scope="row">
                            <input
                                type="checkbox"
                                name=""
                                id={`checkbox-${item.id}`}
                                checked={itensSelecionados.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                                disabled
                            />
                            </th>
                            <td>{item.nome}</td>
                            <td>{item.status === 'A' ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    )}
                </tbody>
                </table>
                <div className="row justify-content-end">
                <div className="col-sm-2">
                    <Button type="submit">Salvar</Button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const { query } = context;
    const id = query.id;
    const response = await apiClient.get('/perfil');
    const responseDadosCadastrados = await apiClient.get(`/usuario/perfil/dados?id=${id}`);
  
    return {
      props: {
        perfilTodos: response.data,
        dadosCadastrados: responseDadosCadastrados.data,
      },
    };
  });
  