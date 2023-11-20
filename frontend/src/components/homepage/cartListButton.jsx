import Dropdown from 'react-bootstrap/Dropdown';

const cartListButton = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
        Cart
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        <hr />

        
        <input id='cardName' type="text"/>
      </Dropdown.Menu>
        
    </Dropdown>
  );
}

export default cartListButton;