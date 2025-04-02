import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Definição explícita dos tipos das props
interface BotaoColecaoProps {
  titulo1: string;
  titulo2: string;
}

const BotaoColecao: React.FC<BotaoColecaoProps> = ({ titulo1, titulo2 }) => {
  const [ativo, setAtivo] = useState<string>(titulo1);  // O título inicial será o primeiro botão
  
  // Função para alternar entre os botões
  const alterarAtivo = (titulo: string) => {
    setAtivo(titulo);
  };

  // Estilos condicionais
  const botaoAtivoEstilo = (titulo: string) => {
    return ativo === titulo
      ? [styles.botao, styles.botaoAtivo] // Caso o botão seja o ativo
      : styles.botao;  // Caso contrário
  };

  const textoAtivoEstilo = (titulo: string) => {
    return ativo === titulo
      ? [styles.texto, styles.textoAtivo]  // Caso o botão seja o ativo
      : styles.texto;  // Caso contrário
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={botaoAtivoEstilo(titulo1)} onPress={() => alterarAtivo(titulo1)}>
        <Text style={textoAtivoEstilo(titulo1)}>{titulo1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={botaoAtivoEstilo(titulo2)} onPress={() => alterarAtivo(titulo2)}>
        <Text style={textoAtivoEstilo(titulo2)}>{titulo2}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginTop: 70,
    position: 'absolute', // Fixa no topo
    top: 0, // Ajuste fino para ficar abaixo do header
    zIndex: 10, // Mantém acima de outros elementos
    backgroundColor: 'white', // Ajuste opcional para destacar
    paddingVertical: 10,
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff', // Cor de fundo padrão
  },
  botaoAtivo: {
    backgroundColor: '#9748FF', // Cor de fundo quando ativo
  },
  texto: {
    fontSize: 16,
    color: '#6C6C6C', // Cor de texto padrão
  },
  textoAtivo: {
    color: '#FFC107', // Cor do texto quando ativo
  },
});

export default BotaoColecao;
