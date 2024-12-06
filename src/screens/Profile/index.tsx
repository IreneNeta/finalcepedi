import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loadData = async () => {
        try {
            const storedName = await AsyncStorage.getItem('name');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('password');
            
            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
            if (storedPassword) setPassword(storedPassword);
        } catch (error) {
            console.log('Erro ao carregar dados: ', error);
        }
    };

    
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
        } catch (error) {
            console.log('Erro ao salvar dados: ', error);
        }
    };

    
    const handleLogout = () => {
        
        navigation.navigate('Login');
    };

    useEffect(() => {
        loadData(); 
    }, []);

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    
                    <Input 
                        label='Nome' 
                        placeholder='digite seu nome'
                        value={name}
                        onChangeText={setName}
                    />
                    <Input 
                        label='E-mail' 
                        placeholder='digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha'
                        value={password}
                        onChangeText={setPassword}
                    />
                </ContentContainer>

                
                <Button 
                    title="Salvar informações" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={saveData} 
                />

                
                <Button 
                    title="Logout" 
                    noSpacing={true} 
                    variant='secondary'
                    onPress={handleLogout} 
                />

                
                <Button 
                    title="Editar Perfil" 
                    noSpacing={true} 
                    variant='tertiary'
                    onPress={() => navigation.navigate('Edit')} 
                />
            </Container>
        </Wrapper>
    );
}
