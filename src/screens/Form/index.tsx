import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';

export default function FormScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleRegister = async () => {
        try {
            
            const response = await api.get('/usuarios');
            const users = response.data;

            
            const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

            
            const newUser = {
                id: nextId, 
                nome: name,
                email: email,
                senha: password
            };

            
            const createResponse = await api.post('/usuarios', newUser);

            
            if (createResponse.status === 201) {
                console.log('Cadastro realizado com sucesso');
                navigation.navigate('Login'); 
            }
        } catch (error) {
            console.log('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    <Input
                        label="Nome"
                        placeholder="Digite seu nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        title="Cadastrar"
                        noSpacing={true}
                        variant="primary"
                        onPress={handleRegister} 
                    />
                    <TextContainer>
                        <TextBlack>Já tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
                            <TextLink>
                                Faça seu login.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}
