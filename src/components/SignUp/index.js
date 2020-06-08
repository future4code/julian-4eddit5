import React from 'react';

import styled from 'styled-components'
import {TelaToda} from '../common/styled'

const DivInterna = styled.div`
  width: 400px;
  box-sizing: border-box;
  height: 600px;
  margin: 5px;
  border: 1px solid black;
  background-color: #fff;
`


const SignUp = () => {



  const [nome, onChangeNome] = useInputValue();
  const [email, onChangeEmail] = useInputValue();
  const [senha, onChangeSenha] = useInputValue();

  const onClickEnviar = () => {
     console.log('funciona')
  }

  return (

    <TelaToda>
      <DivInterna>
        
      </DivInterna>
    </TelaToda>

  );
}

export default SignUp;
