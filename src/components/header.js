import styled from "@emotion/styled";

const HeaderStyled = styled.div`
  height: 10vh;
  border: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  background-image: linear-gradient(to bottom, #ececec -32%, #fff 124%);
  font-size: 28px;
  line-height: 1;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  @media (max-height: 700px) {
    font-size: 3vh;
  }
  div{
    font-family: 'Baskerville', serif;
    color: #3b3b3b;
    margin-left: 10.4%;
    position: absolute;
    top: 35%;
  }
`

export default function Header() {
  return (
    <HeaderStyled>
      <div>
        HACKER NEWS
      </div>
    </HeaderStyled>
  )
}