/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled';

// import AngularLogo from '../static/images/angular.png'
// import ReactLogo from '../static/images/react.png'
// import VueLogo from '../static/images/vue.png'
import Card from '../components/card';

const Options = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 63px;
  @media (max-height: 600px) {
    margin-bottom: 25px;
  }
  div{
    width: 98px;
    height: 31px;
    border: solid 1px #d6d6d6;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 16px;
    color: #606060;
  }
`
const Select = styled.select`
  width: 240px;
  height: 32px;
  border-radius: 4px;
  background: #fff;
  border: solid 1px #2e2e2e;
  padding: 0 12px;
  margin-bottom: 38px;
  @media (max-height: 600px) {
    margin-bottom: 15px;
  }
`
const MainField = styled.div`
  width: 61vw;
  min-width: 500px;
  height: 50vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 30px 40px;
`

export default function Main() {
  return (
    <div css={css`
      @media (max-height: 720px) {
        height: 80vh;
        margin-top: 15vh;
      }
      `}>
      <Options>
        <div>All</div>
        <div>My faves</div>
      </Options>
      <Select name='language'>
        <option hidden selected>Select your news</option>
        <option value='Angular'>Angular</option>
        <option value='Reactjs'>Reactjs</option>
        <option value='Vuejs'>Vuejs</option>
      </Select>
      <MainField>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> 
        <Card/>
      </MainField>
      {/* <div>paginacion</div> */}
    </div>
  );
}