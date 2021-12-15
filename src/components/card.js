/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import FavIcon from '../static/icons/fav.png'
import ClockIcon from '../static/icons/clock.png'

const MainField = styled.div`
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
const TextField = styled.div`
  padding: 16px 16px 14px 26px;
  line-height: 1.43;
`
export default function Card() {
  return (
    <MainField>
      <TextField>
        <CreatedAt><img css={css`margin-right: 8px;`} src={ClockIcon} height='16' alt='clock'/>2 hour ago by author</CreatedAt>
        <div css={css`font-size: 14px;`}>Event-driven state management in React using Storeon</div>
      </TextField>
      <IconField>
        <img src={FavIcon} width='24' alt='fav'/>
      </IconField>
    </MainField>
  )
}