import { FormEvent, useState } from "react";
import style from './styles.module.scss';
import { toast } from "react-toastify";
import Router from "next/router";

export function PesquisaPerfil(){
    const [pesq1, setPesq1] = useState('');
    const [pesq2, setPesq2] = useState('');

    async function handleBuscaPerfil(event: FormEvent) {
        event.preventDefault();

        toast.success("Busca feita com sucesso!");
        Router.push({
            pathname: '/perfil/grid/',
            query: {pesq1, pesq2},
        });
    }

    return(
        <>    
            <form onSubmit={handleBuscaPerfil}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-5 mb-3">
                            <label></label><br/>
                            <input type="text" 
                                placeholder="PESQUISA"
                                id={style.pesquisa}
                                className="p-2"
                                value={pesq1}
                                onChange={(e) => setPesq1(e.target.value)}
                            /> 
                        </div>
                        <div className="col-sm-6">
                            <div className="row justify-content-end">
                                <div className="col-sm-4">
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
                                <div className="col-sm-4">
                                    <br/>
                                    <button id={style.botao} className="p-2" type="submit">
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