import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Button, Container, Form, Navbar, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [propertyList, setPropertyList] = useState([]);
  const api = 'https://9ehuwoplgk.execute-api.eu-north-1.amazonaws.com/propertylisting/properties';
  
  
  
  const onSubmit= () => {
    fetch(api, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        address: address,
        price: price,
        userPostedBy: 'test-user'
      })
    }).then((res) => console.log(res))
    .finally(() => getPropertyList());
  }

  const getPropertyList = () => {
    fetch(api).then(res => res.json()).then(result => {
      console.log(result);
      setPropertyList(result);
    });
  }
  useEffect(() => {
    getPropertyList();
  })
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Realitics
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{width:'500px'}}>
          <h2><Badge bg="primary">Add Property</Badge></h2>
          <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Property Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Property Name" onChange={(event) => setName(event.target.value)} value={name}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Property Description</Form.Label>
            <Form.Control type="text" placeholder="Property Description" onChange={(event) => setDescription(event.target.value)} value={description}/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Property Address</Form.Label>
            <Form.Control type="text" placeholder="Property Address" onChange={(event) => setAddress(event.target.value)} value={address}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Property Price</Form.Label>
            <Form.Control type="number" placeholder="Property Price" onChange={(event) => setPrice(event.target.value)} value={price}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={()=> onSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
      <Container style={{marginTop:'20px'}}>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Property Name</th>
          <th>Description</th>
          <th>Address</th>
          <th>Price</th>
          <th>Posted By</th>
        </tr>
      </thead>
      <tbody>
        { propertyList && propertyList.map(prop => 
          <tr id={prop.propertyId}>
            <td>{prop.name}</td>
            <td>{prop.description}</td>
            <td>{prop.address}</td>
            <td>{prop.price}</td>
            <td>{prop.userPostedBy}</td>
          </tr>
        )}
        
      </tbody>
      </Table>
      </Container>
      
    </>
  );
}

export default App;
