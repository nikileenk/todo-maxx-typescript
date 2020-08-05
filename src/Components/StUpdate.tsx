import React, { Component } from 'react';
import { Container,Form,Button,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons';
import './CompStyle.css';

interface Stateitem{
    currentState?: String | null,
    title?: String | undefined,
    des?: String | undefined,
    created?: String | undefined,
    due?:String | undefined,
    priority?:String | undefined,
    history?:any,
   match?:any,
   id?:String | undefined,
}

class StUpdate extends Component<Stateitem> {
    

    state = {
        id:"",
        currentState: "Pending",
        title: "",
        des: "",
        created: "",
        due:"",
        priority:""

    }
    componentDidMount()
    { 
        
        
        fetch('http://localhost:3000/task/'+this.props.id).then((response) => {
            response.json().then((result) => {
                console.warn(result)
                 this.setState({
                    id:result.id,
                    currentState:"Pending",
                    title:result.title,
                    des:result.des,
                    created:result.created,
                    due:result.due,
                    priority:result.priority

                  })
            })
        })
    }

    handleClose(){
        this.props.history.push('/')
    }

    update()
    {
        
        fetch('http://localhost:3000/task/'+this.state.id, {
            method: "PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                this.props.history.push('/')
            })
        })
    }
    render() {
        console.log(this.state.currentState)
        return (
            <Container>
              
                <div className="upclass">
                
                <div>
                <Col md={{ span: 4, offset: 4 }}>
                <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            {/* <Form.Label>Update Status</Form.Label> */}
                            <Form.Control as="select" onChange={(event) => { this.setState({ currentState: event.target.value }) }}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" onClick={() => { this.update() }}>
                        Update Status
                        </Button>
                </Form>
                </Col>
               
                

                    

                    
                    </div>
                

                    <input onChange={(event) => { this.setState({ title: event.target.value }) }}
                        placeholder="Title" value={this.state.title} style={{display:"none"}} />

                    <input onChange={(event) => { this.setState({ des: event.target.value }) }}
                        placeholder="Description"  value={this.state.des} style={{display:"none"}}/> 

                    <input onChange={(event) => { this.setState({ created: event.target.value }) }}
                        placeholder="Created"  value={this.state.created} style={{display:"none"}}/> 

                    <input onChange={(event) => { this.setState({ due: event.target.value }) }}
                        placeholder="Due"  value={this.state.due} style={{display:"none"}}/> 

                    <input onChange={(event) => { this.setState({ priority: event.target.value }) }}
                        placeholder="Priority"  value={this.state.priority} style={{display:"none"}}/> 

                    
                </div>
           </Container>
        );
    }
}

export default StUpdate;