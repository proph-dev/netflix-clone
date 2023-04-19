import { useCallback, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/form/Input'
import auth from '../styles/pages/auth.module.scss';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

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

                        <form className={ auth.loginForm }>
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

                            <button className={ auth.submitButton }>
                                {variant === "login" ? "S'identifier" : "S'inscrire"}
                            </button>
                        </form>
                        
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