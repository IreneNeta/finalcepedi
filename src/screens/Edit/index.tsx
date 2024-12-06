import React, { useState, useEffect } from 'react';

 import { View, TextInput, Button, Text } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditUser({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [oldEmail, setOldEmail] = useState(''); 

  useEffect(() => {
    const loadEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setOldEmail(storedEmail); 
        fetchUserData(storedEmail); 
      } else {
        alert('Usuário não autenticado');
        navigation.goBack(); 
      }
    };

    loadEmail();
  }, [navigation]);

  const fetchUserData = async (email) => {
    try {
      const response = await api.get('/usuarios');
      const users = response.data;

      const user = users.find(u => u.email === email);
      
      if (user) {
        setNome(user.nome);
        setSenha(user.senha);
        setEmail(user.email);
      }
    } catch (error) {
      console.log('Erro ao buscar dados do usuário', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await api.get('/usuarios');
      const users = response.data;

      const user = users.find(u => u.email === oldEmail);

      if (user) {
        
        await api.put(`/usuarios/${user.id}`, {
          nome,
          email,  
          senha
        });

        
        if (email !== oldEmail) {
          await AsyncStorage.setItem('userEmail', email);
        }

        alert('Dados atualizados com sucesso!');
        navigation.goBack(); 
      } else {
        alert('Usuário não encontrado');
      }
    } catch (error) {
      console.log('Erro ao salvar os dados', error);
    }
  };

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <Text>Editar Usuário</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
