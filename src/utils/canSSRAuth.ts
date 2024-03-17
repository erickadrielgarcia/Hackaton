import { AuthTokenError } from "@/services/errors/AuthTokenError";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";

// Função para usuários logados
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        // Se o usuário tentar acessar qualquer pagina sem estar logado sera redirecionado para a pagina de login

        const token = cookies['@nextauth.token'];

        if(!token) {
            return {
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(context);
        
        } catch(err) {
            if(err instanceof AuthTokenError){
                destroyCookie(context, '@nextauth.token');

                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }

    }

}