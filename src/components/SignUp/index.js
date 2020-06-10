import React from 'react';
import {useForm} from './useForm.js';
import styled from 'styled-components';
import {TelaToda} from '../common/styled';
import {DivInterna, FormContainer, Titulo, CampoPreenchimento,Botao,  } from './style';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const SignUp = () => {
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
  
  const history = useHistory();
  
  const fazerCadastro = (event) => {
    event.preventDefault();
  }

  const onClickEnviar = async () => {
     const body = {
       username: form.name,
       email: form.email,
       password: form.senha
     }
     const response = await axios.post (`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup`, body)

     console.log(response)
  };

  return (

    <TelaToda>
      <DivInterna>
        <FormContainer onSubmit={fazerCadastro}>
      <Titulo>Cadastro</Titulo>
         <CampoPreenchimento
          type='text'
          placeholder='Nome de usuário'
          onChange={onChangeInput}
          value={form.name}
          name="name"
          pattern= "[A-Za-z ]{3,}"
          required
         />

        <CampoPreenchimento
          type='email'
          placeholder='Seu E-mail'
          onChange={onChangeInput}
          value={form.email}
          name="email"
          required
         />

        <CampoPreenchimento
          placeholder="Senha"
          type="password"
          onChange={onChangeInput}
          value={form.senha}
          name='senha'
          required
        />

        <Botao onClick={onClickEnviar}>Cadastrar</Botao>
        </FormContainer>
      </DivInterna>
    </TelaToda>

  );
}

export default SignUp;
