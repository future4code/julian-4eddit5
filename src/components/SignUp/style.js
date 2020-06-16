import styled from 'styled-components';

export const DivInterna = styled.div`
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column; 
  width: 70%;
`

export const CampoPreenchimento = styled.input`
   border: none;
   height:30px;
   border-bottom: 1px solid black;
   margin-bottom: 32px;
   width:100%;
   
   :valid {
     color: green;
   }

   :invalid {
     color: red;
   }
` 

export const Botao = styled.button`
    border: 1px solid black;
    width:30%;
    height: 30px;
    color: black;
    cursor: pointer;
    align-self: center;
`

export const ImagemLogo = styled.img`
  width: 70%;
`

export const TextoLogin = styled.p`
  cursor: pointer;
`

export const MensagemErro = styled.p`
  margin: 8px;
  color: red;
  align-self: center;
`