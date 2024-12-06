import { Image } from 'react-native';
import { useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.get('/usuarios');
            const users = response.data;

            const user = users.find(u => u.email === email && u.senha === senha);

            if (user) {
                
                await AsyncStorage.setItem('userEmail', email);

                
                navigation.navigate('Auth', { screen: 'Home' });
            } else {
                console.log('Login falhou.');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    <Input 
                        label='E-mail' 
                        placeholder='digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />
                    <Button 
                        title="Entrar" 
                        noSpacing={true} 
                        variant='primary'
                        onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}
