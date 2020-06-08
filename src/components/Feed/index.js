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

const Feed = () => {
  return (
    <TelaToda>
      <DivInterna>

      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
