import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

// Definição do schema de validação com o Yup
const schema = yup.object({
  email: yup
    .string()
    .email("E-mail inválido")  // Valida se o e-mail possui um formato correto
    .required("Campo obrigatório"), // E-mail é obrigatório
  password: yup
    .string()
    .min(6, "No mínimo 6 caracteres") // Senha deve ter pelo menos 6 caracteres
    .required("Campo obrigatório"), // Senha é obrigatória
}).required();

// Função do componente de Login
const Login = () => {
  // Utilizando o hook useForm do React Hook Form para manipulação de formulário
  const {
    control, // Controlador de cada campo de entrada
    formState: { errors, isValid }, // Erros do formulário e se o formulário é válido
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema), // Resolução das validações com Yup
    mode: "onBlur", // Validação ao sair do campo (blur)
    defaultValues, // Valores padrão dos campos
    reValidateMode: "onChange", // Revalida o formulário ao alterar qualquer campo
  });

  return (
    <Container>
      {/* Contêiner principal do login */}
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing /> {/* Espaçamento entre os elementos */}
          
          {/* Input de E-mail */}
          <Input
            name="email" // Nome do campo de e-mail
            placeholder="Email" // Texto exibido dentro do campo
            control={control} // Controlador do React Hook Form
            errorMessage={errors?.email?.message} // Mensagem de erro caso exista
          />
          <Spacing />
          
          {/* Input de Senha */}
          <Input
            name="password" // Nome do campo de senha
            type="password" // Tipo de input de senha
            placeholder="Senha" // Texto exibido dentro do campo
            control={control} // Controlador do React Hook Form
            errorMessage={errors?.password?.message} // Mensagem de erro caso exista
          />
          <Spacing />
          
          {/* Botão de Login */}
          <Button title="Entrar" disabled={!isValid} /> {/* Desabilita o botão se o formulário for inválido */}
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
