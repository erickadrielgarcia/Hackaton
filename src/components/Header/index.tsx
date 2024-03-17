import { useContext  } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import  style  from './styles.module.scss';
import { CiUser} from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import Link from 'next/link';

export function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <header className={style.headerContainer}>
        <div className={style.headerContent}>
            <Link href="/home">
            <img src="/logo-white-1.png" width={190} height={60} />
            </Link>

            <nav className={style.menuNav}>
                <div className={style.dropdown}>
                    <button id={style.buttoNav}><strong>MENU</strong><FaCaretDown />
                        <div id={style.dropdownContent} className='justify-content-center text-center align-items-center'>
                            <Link href="/usuarios" className={style.linkMenu}>
                                <CiUser/>
                                Usuários
                            </Link>

                            <Link href="/perfil" className={style.linkMenu}>
                                <IoIosMenu />
                                Perfis
                            </Link>
                        </div>
                    </button>
                </div>
                <button onClick={signOut} id={style.buttoNav}>
                    <strong>SAIR</strong>
                </button>
            </nav>
        </div> 
    </header>
  )
}