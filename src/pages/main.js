/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import { useEffect, useState, createContext } from "react";

import Card from '../components/card';
import GetNews from "../services/getNews";
import Pagination from "../components/pagination";

import AngularLogo from '../static/icons/angular.png';
import ReactLogo from '../static/icons/react.png';
import VueLogo from '../static/icons/vue.png';
import Arrow from "../static/icons/arrow.png";

const Page = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 63px;
  cursor: pointer;
  .selected{
    color: #1797ff;
    border: solid 1px #1797ff;
  }
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
const Select = styled.div`
  cursor: pointer;
  width: 240px;
  height: 32px;
  border-radius: 4px;
  background: #fff;
  border: solid 1px #2e2e2e;
  padding: 0 12px;
  margin-bottom: 38px;
  font-size: 14px;
  position: relative;
  @media (max-height: 600px) {
    margin-bottom: 15px;
  }
  .main-option{
    display: flex;
    justify-content: space-between;
    align-items: center;
    :hover{background: none;}
    img{
      height: 20px;
    }
  }
`
const Option = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.57;
  padding: 6px 0;
  width: 240px;
  :hover{
    background-color: #eaeaea;
  }
`
const DeployedMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  left: 0;
  padding: 15px 144px 12px 10px;
  width: 110px; 
  box-shadow: 0 2px 2px 0 #dad8d8;
  z-index: 99;

`
const MainField = styled.div`
  width: 62vw;
  min-width: 500px;
  height: 45vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 30px 40px;
  overflow: auto;
  @media (max-height: 430px) {
    height: 40vh;
  }
`
export const UpdateContext = createContext();
export default function Main() {
  const [selected, setSelected] = useState('all');
  const [news, setNews] = useState([]);
  const [currentState, setCurrentState]= useState(false);
  const [position, setPosition] = useState(1);
  const [interval, setInterval] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [deployMenu, setDeployMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('filter')){
      GetNews(localStorage.getItem('filter'),position-1).then(data=>filterAndUpdate(data.hits));
    }
  }, [position])
  useEffect(() => {

  },[currentState]);

  function filterAndUpdate(data){
    const arrData = []
    // eslint-disable-next-line array-callback-return
    data.map((element)=>{
      if(arrData.length!==0){
        arrData.some((unit)=>unit.story_id===element.story_id)?console.log(''):(element.created_at&&element.author&&element.story_title&&element.story_url)?arrData.push(element):console.log('');
      }else{
        arrData.push(element);
      }
    });
    setNews(arrData);
  }
  function handleSelect(e){
    localStorage.setItem('filter',e.target.id);
    GetNews(e.target.id,position-1).then(data=>filterAndUpdate(data.hits));
    setDeployMenu(false);
    console.log(deployMenu);
  }

  return (
    <UpdateContext.Provider value={{currentState, setCurrentState}}>
      <div css={css`
        @media (max-height: 720px) {
          height: 80vh;
          margin-top: 15vh;
        }
        .hidden{
          opacity: 0;
        }
        `}>
        <Page>
          <div onClick={()=>setSelected('all')} className={selected==='all'?'selected':''}>All</div>
          <div onClick={()=>setSelected('favs')} className={selected==='all'?'':'selected'}>My faves</div>
        </Page>
        <Select className={selected==='all'?'':'hidden'}>
          <Option className='main-option' onClick={()=>deployMenu?setDeployMenu(false):setDeployMenu(true)}>{localStorage.getItem('filter')?localStorage.getItem('filter').charAt(0).toUpperCase()+localStorage.getItem('filter').slice(1):'Select your news'}<img src={Arrow} alt='arrow'></img></Option>
          {deployMenu===true&&<DeployedMenu>
            <Option id='angular' onClick={(e)=>handleSelect(e)}><img css={css`margin-right:13px;height:24px;`} src={AngularLogo} alt='logo'/> Angular</Option>
            <Option id='reactjs' onClick={(e)=>handleSelect(e)}><img css={css`margin-right:13px;height:24px;`} src={ReactLogo} alt='logo'/>Reactjs</Option>
            <Option id='vuejs' onClick={(e)=>handleSelect(e)}><img css={css`margin-right:13px;height:24px;`} src={VueLogo} alt='logo'/>Vuejs</Option>
          </DeployedMenu>}
        </Select>
        <MainField>
          {selected==='all'?news.length?news.map((item,index)=><Card key={index} item={item}/>):<div css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 5vh;
            color: #606060;
            `}>Try selecting an option</div>:
            localStorage.getItem('favorites')?JSON.parse(localStorage.getItem('favorites')).map((item,index)=><Card key={index} item={item}/>):null}
        </MainField>
        {selected==='all'?news.length?<Pagination data={news} currentPosition={position} changeCurrentPosition={setPosition} interval={interval} setInterval={setInterval}/>:null:null}
      </div>
    </UpdateContext.Provider>
  );
}