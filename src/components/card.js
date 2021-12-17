/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import { useContext } from "react";
import { UpdateContext } from "../pages/main";

import FavIcon from '../static/icons/fav.png';
import FavIconActive from '../static/icons/favActive.png';
import ClockIcon from '../static/icons/clock.png';

const CardContainer = styled.div`
  color: #828282;
  border: solid 1px #979797;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 6px;
  max-width: 550px;
  &:hover {
    opacity: 0.4;
    cursor: pointer;
  }
`
const IconField = styled.div`
  background-color: rgba(96, 96, 96, 0.06); 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.36%;
  min-width: 50px;
`
const CreatedAt = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  margin-bottom: 7px;
`
const TextField = styled.a`
  padding: 16px 16px 14px 26px;
  line-height: 1.43;
  max-height: 90px;
  overflow: hidden;
`
export default function Card({item}) {
  const { currentState, setCurrentState } = useContext(UpdateContext);

  function handleFav(e){
    currentState?setCurrentState(false):setCurrentState(true);
    e.preventDefault();
    if(localStorage.getItem('favorites')){
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      if(favorites.some(fav => fav.story_id === item.story_id )){
        const newFavorites = favorites.filter((fav)=>fav.story_id !== item.story_id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }else{
        localStorage.setItem('favorites', JSON.stringify([...favorites, item]));}
    }else{
      localStorage.setItem('favorites', JSON.stringify([item]));
    }
  }

  function state(){
    if(localStorage.getItem('favorites')){
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      if(favorites.some(fav => fav.story_id === item.story_id )){
        return FavIconActive;
      }
    }
    return FavIcon;
  }

  function time(time){
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);
    if(days>0){
      return `${days} days`;
    }else if(hours>0){
      return `${hours} hours`;
    }else if(minutes>0){
      return `${minutes} minutes`;
    }else if(seconds>0){
      return `${seconds} seconds`;
    }
  }

  return (
    <CardContainer>
      <TextField onClick={()=>window.open(item.story_url,'blank')}>
        <CreatedAt><img css={css`margin-right: 8px;`} src={ClockIcon} height='16' alt='clock'/>{time(item.created_at)} ago by {item.author}</CreatedAt>
        <div css={css`font-size: 14px; word-wrap:break-word;width: 17vw;`}>{item.story_title}</div>
      </TextField>
      <IconField  onClick={(e)=>handleFav(e)}>
        <img src={state()} width='24' alt='fav'/>
      </IconField>
    </CardContainer>
  )
}