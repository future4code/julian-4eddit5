import styled from 'styled-components';

export const DivInterna = styled.div`
width: 400px;
box-sizing: border-box;
height: 600px;
margin: 5px;
border: 1px solid black;
background-color: #fff;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column; 
  
`
export const Titulo = styled.h2`
  
`
export const CampoPreenchimento = styled.input`
   border: none;
   height:30px;
   outline-color:black;
   border-bottom: 1px solid black;
   margin-bottom: 2rem;  
   max-width:100%;
   
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
    
  
`