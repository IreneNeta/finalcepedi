import React, { useState, useEffect } from 'react';
import { Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { VagaProps } from '../../utils/Types';

export default function Details({ route, navigation }) {
    const [id, setId] = useState(route.params.id);
    const [vaga, setVaga] = useState<VagaProps>(null);

    const fetchvaga = async () => {
        try {
            const response = await api.get(`/vagas/${id}`);
            const data = response.data;
            setVaga({
                id: data.id,
                title: data.titulo,
                date: data.dataCadastro,
                description: data.descricao,
                phone: data.telefone,
                company: data.empresa,
                status: data.status,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleContact = () => {
        if (!vaga.phone) {
            Alert.alert('Erro', 'Número de telefone não disponível para esta vaga.');
            return;
        }

        const formattedPhone = vaga.phone.replace(/[^0-9]/g, ''); 
        const whatsappUrl = `https://wa.me/${formattedPhone}`;

        Linking.canOpenURL(whatsappUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(whatsappUrl);
                } else {
                    Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
                }
            })
            .catch((err) => console.error('Erro ao abrir WhatsApp:', err));
    };

    useEffect(() => {
        fetchvaga();
    }, [id]);

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>Voltar</ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            {vaga ? (
                <Container>
                    <ContentContainer>
                        <Title>{vaga.title}</Title>
                        <Description>{vaga.description}</Description>
                    </ContentContainer>
                    {vaga.status === 'aberta' && (
                        <Button 
                            title="Entrar em contato" 
                            noSpacing={true} 
                            variant="primary"
                            onPress={handleContact}
                        />
                    )}
                </Container>
            ) : (
                <Title>Vaga não foi encontrada.</Title>
            )}
        </Wrapper>
    );
}
