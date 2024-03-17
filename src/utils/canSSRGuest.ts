import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// Função acesso de pagina para usuário não logado
export function canSSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(context);

        // Se o usuário tentar acessar a pagina inicial já estando logado ele será redirecionado para Home
        if(cookies['@nextauth.token']) {
            return {
                redirect:{
                    destination: '/home',
                    permanent: false,
                }
            }
        }

        return await fn(context);

    }

}