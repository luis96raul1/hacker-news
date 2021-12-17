import styled from '@emotion/styled';

const MainField = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 18vh;
  display: flex;
  justify-content: center;
  @media (max-height: 1000px) {
    height: 10vh;
  }
.active{
  background: #1890ff;
  color: white;
  border: solid 1px #1890ff;
}
`
const Position = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: solid 1px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin: 0 4px;
  background: #fff;
  cursor: pointer;
`

export default function Pagination({interval, setInterval, data, currentPosition, changeCurrentPosition}) {

  function changePosition(character){
    if(character==='-'&&currentPosition>1){
        updateInterval(character);
        changeCurrentPosition(currentPosition-1);
    }else if(character==='+'&&data.length!==0){
        updateInterval(character);
        changeCurrentPosition(currentPosition+1);
    }else if(Number.isInteger(+character)){
      changeCurrentPosition(character);
    }
  }

  function updateInterval(character){
    if(currentPosition===interval[0]&&character==='-'){
      setInterval(interval.map((item)=>item-1));
    }
    if(currentPosition===interval[8]&&character==='+'){
      setInterval(interval.map((item)=>item+1));
    }
  }

  return(
    <MainField>
      <Position onClick={()=>changePosition('-')}>&#60;</Position>
      {interval.map(item=><Position key={item} className={item===currentPosition?'active':''} onClick={()=>changePosition(item)}>{item}</Position>)}
      <Position onClick={()=>changePosition('+')}>&#62;</Position>
    </MainField>
  )
}