import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import Link from 'next/link';
import { Header } from "@/components/Header"
import  style  from './styles.module.scss';

export default function Home(){
    return(
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <div className={style.main}>
                <div className={style.conteudo}>
                    <h1 className={style.titulo}>SISTEMA DE CADASTRO DE <span className={style.ciano}>USUÁRIOS E PERFIS</span></h1>
                    <Link href="/usuarios">
                        <button className={style.botao}>GERENCIE USUÁRIOS</button>
                    </Link>
                    <Link href="/perfil">
                        <button className={style.botao}>ADMINISTRE PERFIS</button>
                    </Link>
                </div>
                <div>
                    <img className={style.img} src="./rectangle-23.jpg" alt="" />
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