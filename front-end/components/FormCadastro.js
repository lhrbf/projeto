import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function FormCadastro() {
  const [matricula, onChangeMatricula] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const resposta = await fetch('https://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        navigation.navigate('Mapa');
      } else {
        setMensagemErro(dados.mensagem);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      setMensagemErro('Erro na conexão com o servidor. Tente novamente mais tarde.');
    }
  };

  const navegarParaOutraPagina = () => {
    navigation.navigate('Login');
  };
//Formulário Cadastro
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={onChangeMatricula}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.botao, { backgroundColor: 'green' }]}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Cadastrar</Text>
      </TouchableOpacity>
      <View style={styles.divLinks}>
        <TouchableOpacity onPress={navegarParaOutraPagina}>
          <Text style={styles.esqueciSenha}>Faça o login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 52,
    width: "70%",
    marginBottom: 18,
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    borderColor: "orange",
  },
  botao: {
    borderRadius: 7,
    padding: 14,
    marginTop: 10,
  },
  divLinks: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  esqueciSenha: {
    paddingTop: 10,
    color: "blue",
  },
});

export default FormCadastro;