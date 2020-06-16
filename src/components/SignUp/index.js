import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from '../hooks/useForm';
import {TelaToda} from '../common/styled';
import {DivInterna, FormContainer, CampoPreenchimento, Botao, ImagemLogo, TextoLogin, MensagemErro} from './style';
import axios from 'axios';
import logo from '../../img/logo.png'

const SignUp = () => {
  document.title="Cadastro"
  const history = useHistory();
  const token = localStorage.getItem("token");

  if(token)
    history.push('/')

  const [erro, setErro] = useState(null);
  const {form, changeValue} = useForm(
    { 
      nome:"", 
      email:"",
      senha:""
    });
  
  const onChangeInput = (event) => {
    const{name, value} = event.target;
    changeValue(name, value);
  };

  const enviarCadastro = async (event) => {
    event.preventDefault();

    const body = {
      username: form.nome,
      email: form.email,
      password: form.senha
    }
    
    axios
      .post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup`, body)
      .then(response=>{
        localStorage.setItem("token", response.data.token);
        history.push('/')
      })
      .catch(error=>{
        setErro(error.response.data.message);
      })

  };

  return (

    <TelaToda>
      <DivInterna>
          <ImagemLogo src={logo} alt="labeddit" />
          <h2>Cadastro</h2>
          <FormContainer onSubmit={enviarCadastro}>
            {erro && <MensagemErro>{erro}</MensagemErro>}
            <label for="nome">Nome de usuário</label>
            <CampoPreenchimento
              type='text'
              placeholder='Nome de usuário'
              onChange={onChangeInput}
              value={form.nome}
              name="nome"
              pattern= "[A-Za-z ]{3,}"
              required
            />
            <label for="email">E-mail</label>
            <CampoPreenchimento
              type='email'
              placeholder='E-mail'
              onChange={onChangeInput}
              value={form.email}
              name="email"
              required
            />
            <label for="senha">Senha</label>
            <CampoPreenchimento
              placeholder="Senha"
              type="password"
              onChange={onChangeInput}
              value={form.senha}
              name='senha'
              required
            />
            <Botao>Cadastrar</Botao>
          </FormContainer>
          <TextoLogin onClick={()=>{history.push('/login')}}>Clique aqui para fazer login</TextoLogin>
      </DivInterna>
    </TelaToda>

  );
}

export default SignUp;
