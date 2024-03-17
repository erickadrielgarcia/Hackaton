import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '@/services/apiClients';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router, {useRouter} from 'next/router';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  cadastrarUsuario: (credentials: CadastroUsuarioProps) => Promise<void>;
  cadastraPerfil: (credentials: CadastroPerfilProps) => Promise<void>;
  excluiUsuario: (credentials: ExcluiUsuarioEPerfilProps) => Promise<void>;
  excluiPerfil: (credentials: ExcluiUsuarioEPerfilProps) => Promise<void>;
}

type UserProps = {
  id: string;
  nome: string;
  login: string
}

type SignInProps = {
  login: string;
  senha: string;
}

type CadastroUsuarioProps = {
  nome: string;
  login: string;
  senha: string; 
  status: string;
}

type CadastroPerfilUsuarioProps = {
  id_perfil:string;
  id_usuario: number;
}

type AuthProviderProps = {
  children: ReactNode;
}

type CadastroPerfilProps = {
  nome: string;
  status: string;
}

type ExcluiUsuarioEPerfilProps = {
  id?: number;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/');
  }catch{
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    
    // Tentar pegar o token no cookie
    const {'@nextauth.token': token} = parseCookies();

    if(token){
      api.get('/usuarioinfo').then(response => {
        const {id, nome, login} = response.data;

        setUser({
          id,
          nome,
          login
        })

      })
      .catch(() => {
        // Se deu erro Deslogamos o usuário
        signOut();
      }) 
    }

  }, [])

  async function signIn({ login, senha }: SignInProps){
    try{
      const response = await api.post('/session', {
        login,
        senha
      })
      
      const { id, nome, token } = response.data;
      
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        nome,
        login,
      })


      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Bem vindo ao Sistema!")

      //Redirecionar o user para /home
      Router.push('/home')


    }catch(err){
      toast.error("Erro ao acessar!")
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  async function cadastrarUsuario({nome, login, senha, status}: CadastroUsuarioProps) {
    
    try {
      
      console.log(nome, login, status, senha);

      // ***----COMENTADO PARA NÃO REGISTRAR NO BANCO DE DADOS----***
      
      const response = await api.post('/usuario', {
        nome,
        login,
        senha, 
        status
      })
      
      const {id} = response.data;

      toast.success("Usuário inserido com sucesso!")

      Router.push(`usuarios/detalhes/${id}`)

    } catch (err) {
      toast.error("Erro ao inserir usuário!")
      console.log("Erro ao cadastrar", err)
    }
  }

  async function cadastraPerfil ({nome, status}: CadastroPerfilProps) {
    try {
      const response = await api.post('/perfil', {
        nome,
        status
      })
  
      const {id} = response.data;
      
      toast.success("Perfil Inserido com sucesso!")

      Router.push(`perfil/detalhes/${id}`)

    } catch (err) {
      toast.error("Erro ao inserir perfil!")
      console.log("Erro ao cadastrar", err)
    }
  }

  async function excluiUsuario({ id }: ExcluiUsuarioEPerfilProps = {}): Promise<void> {
    try {
        const response = await api.delete(`/usuario/exclui/?id=${id}`);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Usuário excluído com sucesso");
          router.reload();
      } else {
          // Se a resposta indica um erro, trata o erro
          const errorMessage = response.data.error || "Erro ao excluir usuário";
          toast.error(errorMessage);
          console.error("Erro ao excluir usuário:", response.status, errorMessage);
      }
    } catch (err) {
        if (err.response && err.response.status === 400) {
            const errorMessage = err.response.data.error || "Erro ao excluir usuário";
            toast.error(errorMessage);
        } else {
            toast.error("Erro ao excluir usuário por possuir vinculo com algum perfil");
        }
        console.error("ERRO AO EXCLUIR", err);
    } 
  }

  async function excluiPerfil({ id }: ExcluiUsuarioEPerfilProps = {}): Promise<void> {
    try {
        const response = await api.delete(`/perfil/exclui/?id=${id}`);

        if (response.status >= 200 && response.status < 300) {
        
          toast.success("Perfil excluído com sucesso");
          router.reload();
      
        } else {
          // Se a resposta indica um erro, trata o erro
          const errorMessage = response.data.error || "Erro ao excluir Perfil";
          toast.error(errorMessage);
          console.error("Erro ao Perfil usuário:", response.status, errorMessage);
      }

    } catch (err) {
        
      if (err.response && err.response.status === 400) {
            const errorMessage = err.response.data.error || "Erro ao excluir perfil";
            toast.error(errorMessage);
        } else {
      
          toast.error("Erro ao excluir perfil por possuir vinculo com algum usuário");
        
        }
        console.error("ERRO AO EXCLUIR", err);
    } 
  }

  return(
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      signIn, 
      signOut, 
      cadastrarUsuario, 
      cadastraPerfil,
      excluiUsuario,
      excluiPerfil,
      }}>
      {children}
    </AuthContext.Provider>
  )
}