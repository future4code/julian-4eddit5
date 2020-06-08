import React from 'react';
import {useHistory} from 'react-router-dom'
import {useInputValue} from './useInputValue.js'

const SignUp = () => {



  const [nome, onChangeNome] = useInputValue();
  const [email, onChangeEmail] = useInputValue();
  const [senha, onChangeSenha] = useInputValue();

  const onClickEnviar = () => {
     console.log('funciona')
  }

  return (
    <div>
       <div>
         <h1>Cadastro</h1>
         <input
          type='text'
          placeholder='Nome de usuário'
          onChange={onChangeNome}
          value={nome}
          name="nome"
          pattern= "[A-Za-z ]{3,}"
          required
         />

        <input
          type='email'
          placeholder='Seu E-mail'
          onChange={onChangeEmail}
          value={email}
          name="email"
          required
         />

        <input
          placeholder="Senha"
          type="password"
          onChange={onChangeSenha}
          value={senha}
          name='senha'
          pattern={[
            '^.{8,}$', 
            '(?=.*\\d)', 
            '(?=.*[A-Z])', 
          ]}
          required
        />

        <button onClick={onClickEnviar}>Cadastrar</button>
       </div>
    </div>
  );
}

export default SignUp;
