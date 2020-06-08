import React, {useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'
import {useForm} from '../hooks/useForm'
import {useHistory} from 'react-router-dom';

const DivInterna = styled.div`
  width: 400px;
  box-sizing: border-box;
  height: 600px;
  margin: 5px;
  border: 1px solid black;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImagemLogo = styled.img`
  width: 70%;
`

const Formulario = styled.form`
  margin: 8px;
  display: flex;
  width: 70%;
  flex-direction: column;
`

const Botao = styled.button`
  width: 50%;
  margin: 8px;
  align-self: center;
`

const MensagemErro = styled.p`
  margin: 0;
  color: red;
  align-self: center;
`

const Login = () => {
  document.title="Login";

  const {form, changeValue} = useForm({email: '', senha: ''})
  const [erro, setErro] = useState(null);
  const history = useHistory();

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value);
  }

  const fazerLogin = (event) => {
    event.preventDefault();

    const body = {
      email: form.email,
      password: form.senha
    }

    axios
      .post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login", body)
      .then(response=>{
        localStorage.setItem("token", response.data.token);
        history.push('/')
      })
      .catch(error=>{
        setErro(error.response.data.message);
      })
  }

  return (
    <TelaToda>
      <DivInterna>
        <ImagemLogo src = {logo} />
        <Formulario onSubmit={fazerLogin}>
          {erro && <MensagemErro>{erro}</MensagemErro>}
          <label for="email">E-mail</label>
          <input name="email" value={form.email} onChange={onChangeInput} type="email" placeholder="E-mail" required />
          <label for="senha">Senha</label>
          <input name="senha" value={form.senha} onChange={onChangeInput} type="password" placeholder="Senha" required />
          <Botao>Entrar</Botao>
        </Formulario>
      </DivInterna>
    </TelaToda>
  );
}

export default Login;
