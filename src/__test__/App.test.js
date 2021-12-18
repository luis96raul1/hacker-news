import App from '../App';
import Main from '../pages/main';
import {render,screen} from "@testing-library/react";

test('header is on page',()=>{
    render(<App/>);
    const header = screen.getByText(/hacker news/i)
    expect(header).toBeInTheDocument();
})

test('a message is displayed when page is open for the first time', () => {
  render(<Main/>);
  expect(screen.getByText(/try selecting an option/i).textContent).toBe('Try selecting an option');
})

test('filter can be deployed and hide after selecting a option',()=>{
  render(<Main/>);
  screen.getByText(/Select your news/i).click();
  expect(screen.getByText(/Angular/i).textContent).toBe(' Angular');
  screen.getByText(/Angular/i).click();
  expect(screen.queryByText(/Select your news/i)).toBeNull();
})