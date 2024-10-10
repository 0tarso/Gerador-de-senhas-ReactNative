# DestravaAí - Gerador de Senhas

DestravaAí, como foi carinhosamente apelidado, é um aplicativo de gerador de senhas desenvolvido com React Native e Expo, que oferece uma interface simples e amigável para criar senhas fortes e seguras.
Além disso, o app utiliza autenticação para garantir a segurança do usuário e armazena as senhas localmente de forma segura usando o Expo SecureStore.

## Funcionalidades

- Gerador de senhas seguras
- Autenticação de usuário
- Armazenamento seguro das senhas geradas

## Dependências

O projeto utiliza várias bibliotecas para facilitar o desenvolvimento e melhorar a segurança e a usabilidade. Abaixo estão algumas das dependências principais e suas utilizações:

1. **Expo SecureStore**
   - **Uso:** O `expo-secure-store` é utilizado tanto para autenticação quanto para armazenar as senhas geradas de forma segura no dispositivo do usuário. Ele fornece uma maneira fácil de armazenar pares chave-valor de forma criptografada.

2. **React Navigation**
   - **Uso:** O React Navigation (`@react-navigation/native` e `@react-navigation/native-stack`) é usado para implementar a navegação entre as telas do aplicativo, facilitando a criação de uma navegação intuitiva para o usuário

3. **Async Storage**
   - **Uso:** O `@react-native-async-storage/async-storage` é utilizado para armazenar dados de forma persistente no dispositivo. Embora o SecureStore seja usado para senhas, o Async Storage pode ser usado para armazenar preferências do usuário ou outras informações não sensíveis.
