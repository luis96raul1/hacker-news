/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import { useEffect, useState, createContext } from "react";

import Card from '../components/card';
import GetNews from "../services/getNews";
import Pagination from "../components/pagination";

const Options = styled.div`
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
const Select = styled.select`
  cursor: pointer;
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
  width: 62vw;
  min-width: 500px;
  height: 45vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 30px 40px;
  overflow: auto;
`
export const UpdateContext = createContext();
export default function Main() {
  const [selected, setSelected] = useState('all');
  const [news, setNews] = useState([]);
  const [currentState, setCurrentState]= useState(false);
  const [position, setPosition] = useState(1);
  const [interval, setInterval] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    if (localStorage.getItem('filter')){
      GetNews(localStorage.getItem('filter'),position-1).then(data=>filterAndUpdate(data.hits));
    }
  }, [position])
  useEffect(() => {

  },[currentState]);

  function filterAndUpdate(data){
    const arrData = []
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
    localStorage.setItem('filter',e.target.value);
    GetNews(e.target.value,position-1).then(data=>filterAndUpdate(data.hits));
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
        <Options>
          <div onClick={()=>setSelected('all')} className={selected==='all'?'selected':''}>All</div>
          <div onClick={()=>setSelected('favs')} className={selected==='all'?'':'selected'}>My faves</div>
        </Options>
        <Select name='language' className={selected==='all'?'':'hidden'} defaultValue={localStorage.getItem('filter')?localStorage.getItem('filter'):''} onChange={(e)=>handleSelect(e)}>
          <option hidden >Select your news</option>
          <option value='angular'>Angular</option>
          <option value='reactjs'>Reactjs</option>
          <option value='vuejs'>Vuejs</option>
        </Select>
        <MainField>
          {selected==='all'?news.map((item,index)=>{
            return <Card key={index} item={item}/>}):localStorage.getItem('favorites')?JSON.parse(localStorage.getItem('favorites')).map((item,index)=>{
              return <Card key={index} item={item}/>}):null}
        </MainField>
        {selected==='all'?<Pagination data={news} currentPosition={position} changeCurrentPosition={setPosition} interval={interval} setInterval={setInterval}/>:null}
      </div>
    </UpdateContext.Provider>
  );
}