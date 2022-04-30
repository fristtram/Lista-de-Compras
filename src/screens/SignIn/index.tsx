import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount() {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Usuário criado com sucesso!');
    })
    .catch(error => {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        return Alert.alert('E-mail já em uso. cadastre um novo e-mail!')
      }
      if (error.code === 'auth/weak-password') {
        return Alert.alert('A senha deve ter no mínimo 6 digitos.')
      }
      if (error.code === 'auth/invalid-email') {
        return Alert.alert('E-mail inválido!')
      }
    });
  }

  function handleSignInWithEmailAndPassword(){
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
       return Alert.alert('Usuário não encontrada. E-mail e/ou senha inválida!');
      }
    });
  }

  return (
    <Container>
      <Title>Lista de Compra</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}