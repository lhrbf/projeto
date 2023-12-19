import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function FormLogin() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setMensagemErro('Por favor, preencha todos os campos.');
        return;
      }

      setLoading(true);
      const resposta = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: password }),
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
    navigation.navigate('Cadastro');
  };
  
  return (
    <View style={styles.container}>
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
        <Text style={{ color: 'white', fontSize: 18 }}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.divLinks}>
        <Text style={styles.esqueciSenha}>Esqueci a senha</Text>
        <TouchableOpacity onPress={navegarParaOutraPagina}>
          <Text style={styles.cadastre}>Não possui cadastro? Cadastre-se</Text>
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
  cadastre: {
    paddingTop: 40,
    color: "blue",
  },
});

export default FormLogin;