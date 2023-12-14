import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

function FormLogin() {

    const [email, onChangeEmail] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const navigation = useNavigation();
  
    const handleSubmit = async () => {
      try {
        const resposta = await fetch('https://localhost:300/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha }),
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
          value={senha}
          onChangeText={onChangeSenha}
        />
        <View style={styles.divBotao}>
        <Button
          style={styles.botao}
          onPress={handleSubmit}
          title='Entrar'
        />
        </View>
        <View style= {styles.divLinks}>
          <Text style= {styles.esqueciSenha}>Esqueci a senha</Text>
          <TouchableOpacity onPress={navegarParaOutraPagina}>
          <Text style= {styles.cadastre}>Não possui cadastro? Cadastre-se</Text>
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
    divBotao: {
      padding: 10,
      borderRadius: 20,
      width: "35%",
      paddingTop: 22,
    },
    botao: {
      borderRadius: 20,
    },
    divLinks: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
  
    esqueciSenha: {
      paddingTop: 10,
      color: "green",
    },
  
    cadastre: {
      paddingTop: 40,
      color: "green",
    },
  });
  
  export default FormLogin;