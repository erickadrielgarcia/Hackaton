import { FormEvent, useState, useEffect } from "react";
import style from './styles.module.scss';
import Select from 'react-select';
import { toast } from "react-toastify";
import Router from "next/router";
import { setupAPIClient } from "@/services/api";

type Perfil = {
    id: number;
    nome: string;
    status: string;
}

export function PesquisaUsuario() {
    const [pesq1, setPesq1] = useState('');
    const [pesq2, setPesq2] = useState('');
    const [pesq3, setPesq3] = useState<Perfil[]>([]);
    const [perfil, setPerfil] = useState<Perfil[]>([]);

    useEffect(() => {
        async function fetchPerfil() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/perfil');
            setPerfil(response.data);
        }

        fetchPerfil();
    }, []);

    async function handleBuscaUsuario(event: FormEvent) {
        event.preventDefault();

        toast.success("Busca feita com sucesso!");
        Router.push({
            pathname: '/usuarios/grid/',
            query: { pesq1, pesq2, pesq3: pesq3.map(item => item.id).join(',') },
        });
    }

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: '20px',
            border: 'solid 1px #6F42C1',
            color: '#000',
            maxHeight: '120px', // ajuste a altura máxima conforme necessário
            overflowY: 'auto', // adicione a barra de rolagem quando necessário
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: '20px',
            border: 'solid 1px #6F42C1',
            color: '#000',
            
        }),
    };

    return (
        <>
            <form onSubmit={handleBuscaUsuario}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-5 mb-3">
                            <label></label><br />
                            <input type="text"
                                placeholder="PESQUISA"
                                id={style.pesquisa}
                                className="p-2"
                                value={pesq1}
                                onChange={(e) => setPesq1(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-7">
                            <div className="row justify-content-end">
                                <div className="col-sm-3">
                                    <label>Status:</label>
                                    <select
                                        id={style.pesq} 
                                        className="p-2"
                                        value={pesq2}
                                        onChange={(e) => setPesq2(e.target.value)}
                                    >
                                        <option value="">Todos</option>
                                        <option value="A">Ativo</option>
                                        <option value="I">Inativo</option>
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <label>Perfis:</label>
                                    <Select
                                        key={perfil.map(item => item.id).join(',')}
                                        isMulti
                                        options={perfil.map((item) => ({ value: item.id, label: item.nome }))}
                                        value={pesq3.map((item) => ({ value: item.id, label: item.nome }))}
                                        onChange={(selectedOptions) => setPesq3(selectedOptions.map(option => perfil.find(p => p.id === option.value)!))}
                                        styles={customStyles}
                                        placeholder="Selecione os perfis"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <br />
                                    <button className="p-2" type="submit" id={style.botao}>
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
