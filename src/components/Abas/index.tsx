
export function Aba(data){
    return (
        <>
            {data.url == "usuarios/detalhes" ?
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href={`/usuarios/detalhes/${data.id}`}>Usuário</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={`/usuarios/perfil/${data.id}`}>Perfil</a>
                    </li>
                </ul> :

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link" href={`/usuarios/detalhes/${data.id}`}>Usuário</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href={`/usuarios/perfil/${data.id}`}>Perfil</a>
                    </li>
                </ul>
            }
        </>
    )
}