import axios from 'axios';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/form/Input'
import auth from '../styles/pages/auth.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    // Login
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);

    // Register
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });

            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);

    return (
        <div className={ auth.hero }>
            <div className={ auth.filter }>
                <nav>
                    <Image 
                        src="/images/logo.png"
                        alt="Logo"
                        width={200}
                        height={48}
                    />
                </nav>

                <section className={ auth.authForm }>
                    <div className={ auth.wrapper }>
                        <h2>{ variant === "login" ? "S'identifier" : "S'inscrire" }</h2>

                        <div className={ auth.loginForm }>
                            {variant != "login" && (
                                <Input
                                    label='Pseudo'
                                    onChange={(e: any) => setName(e.target.value)}
                                    id='name'
                                    value={name}
                                />
                            )}
                            <Input
                                label='Email'
                                onChange={(e: any) => setEmail(e.target.value)}
                                id='email'
                                type='email'
                                value={email}
                            />
                            <Input
                                label='Mot de passe'
                                onChange={(e: any) => setPassword(e.target.value)}
                                id='password'
                                type='password'
                                value={password}
                            />

                            <button onClick={ variant === 'login' ? login : register } className={ auth.submitButton }>
                                {variant === "login" ? "S'identifier" : "S'inscrire"}
                            </button>

                            <div className={ auth.othersConnexion }>
                                <div onClick={() => signIn('google', { callbackUrl: '/' })} className={ auth.google }>
                                    <FcGoogle size={30} />
                                </div>
                                <div onClick={() => signIn('github', { callbackUrl: '/' })} className={ auth.google }>
                                    <FaGithub size={30} />
                                </div>
                            </div>
                        </div>
                        
                        <p className={ auth.createAccount }>
                            {variant === "login" ? "Première visite sur Netflix ?" : "Vous avez déjà un compte ?"}
                            <span onClick={ toggleVariant } className={ auth.link }>
                                {variant === "login" ? "Inscrivez-vous" : "S'identifier"}
                            </span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Auth;