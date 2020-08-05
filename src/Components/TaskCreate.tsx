import React, { Component } from 'react';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import './CompStyle.css';

interface Stateitem{
    currentState?: String,
    title?: String | null,
    des?: String | null,
    created?: String | null,
    due?:String | null,
    priority?:String | null,
    sdata?:String | null,
    rows?:number,
    today?:String | any
}

class TaskCreate extends Component<Stateitem> {

    state = {
        currentState: "Pending",
            title: null,
            des: null,
            created: null,
            due:null,
            priority:"High",
            data:""
    }
    create () {

        if(this.state.title == null){
          
            this.setState({data:"Summary cannot be empty"})
        }

        else if(this.state.des == null){
            this.setState({data:"Description cannot be empty"})
        }

        else if(this.state.due == null){
            this.setState({data:"DUE cannot be empty"})
        }

        else{
            fetch('http://localhost:3000/task', {
            method: "Post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                this.setState({data:"Task Added Successfully"})
            })
        })
        
        }

       
        
    }

    componentDidMount() {
        var today : any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState({created:today,due:today})
    }
    
    render() {
        return (
           
                <Container>
                
                <div>
                
                <Form>
                    <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="CurrentState" style={{display:"none"}} />
                   

                    <Form.Group controlId="formBasicSum">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="Text" placeholder="Enter Summary" onChange={(event) => { this.setState({ title: event.target.value }) }} maxLength={140} minLength={10} required/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(event) => { this.setState({ des: event.target.value }) }} maxLength={500} minLength={10}/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicDate">
                            <Form.Label>DUE</Form.Label>
                            <Form.Control type="Date" placeholder="Enter Summary" onChange={(event) => { this.setState({ due: event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={(event) => { this.setState({ priority: event.target.value }) }}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row><br/>

                    <Button variant="primary" onClick={() => { this.create() }} style={{float:"right"}}>
                        Add Task
                    </Button>
                </Form>

                {this.state.data === "Task Added Successfully"? <h6 style={{color:"green"}}>{this.state.data}</h6> :<h6 style={{color:"red"}}>{this.state.data}</h6> } 
                   


                    {/* <button onClick={() => { this.create() }}>Add Task</button> */}
                </div>

                </Container>
            
        );
    }
}

export default TaskCreate;