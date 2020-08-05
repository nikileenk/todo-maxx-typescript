import React, { Component } from 'react';
import { Table, Container,Button,Form,Col,Row,Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import './CompStyle.css';
import axios from 'axios';
import TaskUpdate from './TaskUpdate';
import StUpdate from './StUpdate';


interface Props{
            stat?:string,
            history?:any,
            refresh?:String | any
           
}

interface Stateitem{
    list?: Array<String> | null,
    status?:string | null,
    currentState?:string | null,
    searchData?: string | null,
    noData?:false | true,
    lastSearch?:"",
    key?:string,
    group?:string | null,
    plist?: Array<String> | null | any,
    show?:false| true,
    show1?:false| true,
    show2?:false| true,
    upkey?:String | undefined,
    supkey?:String | undefined
}

class TaskList extends Component<Props,Stateitem> {

    constructor(Props:Props) {
        super(Props);
        this.state = {
            list: [],
            status:this.props.stat,
            currentState:null,
            searchData: null,
            noData:false,
            lastSearch:"",
            key:"",
            group:null,
            plist:[],
            show:false,
            show1:false,
            show2:false,
            upkey:"",
            supkey:"",
           
        }
        }


    componentDidMount() {
        axios.get(`http://localhost:3000/task?q=`+ "")
        .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })

    }

    componentDidUpdate(prevProps:any){

        if(prevProps.refresh !== this.props.refresh){
            this.getData()
        }
        
        if(prevProps.stat !== this.props.stat){
               this.setState({key:this.props.stat})
             
               axios.get(`http://localhost:3000/task?q=`+ this.props.stat)
                .then(response=>{
                    console.log(response.data)
                    this.setState({list:response.data});
                })
                
           }

       }

       handleShow =(ukey:any,ikey:any)=> {
           if(ukey === "update"){
            this.setState({show1:true,upkey:ikey})
            
           }

           else{
            this.setState({show:true})
            console.log(this.props)
           }
       
        }

        shandleShow = (skey:any) =>{
            this.setState({show2:true,supkey:skey})
        }



   

    getData=()=>{
       
        axios.get(`http://localhost:3000/task?q=`+ "")
        .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })

        
    }

    group(val:string){
        this.setState({group:val})
        
       
            axios.get(`http://localhost:3000/task?q=`+ val)
            .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })
        
    }

    handleClose(){
        this.setState({show:false,show1:false})
        this.props.history.push('/');
    }

    search(key:any) {
        console.warn(key)
        this.setState({lastSearch:key})
        fetch("http://localhost:3000/task?q=" + key).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", resp)
                if(resp.length>0)
                {
                    this.setState({searchData:resp,noData:false,list:resp})
                }
                else
                {
                    this.setState({noData:true,searchData:null})
                }
            })
        })
    }

    view(id:number){
       
        axios.get(`http://localhost:3000/task?q=`+ id,)
        .then(response=>{
        console.log(response.data)
        this.setState({plist:response.data});
    })
    this.setState({show:true})
    }

    delete(id:number)
    {
        axios.delete('http://localhost:3000/task/'+id)
        .then(resp=>{
           
            this.getData()
        })

      
    }

    render() {
        return (
            <Container>
               
            <br/>
            <div className="group">
                   <Form.Group controlId="exampleForm.ControlSelect1">
                           <Form.Label>Sort By</Form.Label>
                           <Form.Control as="select" onChange={(event) => this.group(event.target.value)}>
                           <option value="">None</option>
                           <option value="High">High</option>
                           <option value="Medium">Medium</option>
                           <option value="Low">Low</option>
                          
                           </Form.Control>
                       </Form.Group>
            </div> 
            <div className="search">
            <Form.Label>Search tasks</Form.Label>      
            <Form.Control type="text"  onChange={(event) => this.search(event.target.value)}   placeholder="Search Tasks" />
            </div>
            
            <br/>
            
             
        {
            this.state.list ?
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                            
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Due</th>
                                <th>Priority</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
        {
            this.state.list.map((item:any, i:any) =>
                <tr key={i}>
                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.id}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.id}</td> }

                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.title}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.title}</td> }
                    
                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.des}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.des}</td> }

                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.created}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.created}</td> }

                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.due}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.due}</td> }

                    {item.currentState === "Completed" ?
                    <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.priority}</td>:
                    <td onClick={()=>this.view(item.title)}>{item.priority}</td> }
                    
                    
                    <td><FontAwesomeIcon icon={faEdit} color="orange" onClick={(e:any) => this.handleShow('update',item.id)}/>&nbsp;&nbsp;&nbsp;
                    <span onClick={()=>{ if (window.confirm('Are you sure you wish to delete this task?')) this.delete(item.id)}}><FontAwesomeIcon icon={faTrash} color="red" /> </span>
                    
                    </td>
                    <td> {item.currentState ==="Pending"?
                    
                    <Button variant="danger" style={{color:"white"}} onClick={(e:any) => this.shandleShow(item.id)}>{item.currentState} 
                    </Button>
                
                    :
                    <Button variant="success" style={{color:"white"}} onClick={(e:any) => this.shandleShow(item.id)}>{item.currentState} 
                    </Button>
                }
                        
                    </td>
                </tr>
            ).reverse()
            
            
        }
            </tbody>
        </Table>
    </div>
    : <p>Please Wait...</p>
               }
                   {
                       this.state.noData?<h3>No Search Data Found</h3>:null
                   } 

                  


                   <Modal show={this.state.show} onHide={(e:any) => this.handleClose()} size="lg" backdrop="static" keyboard={false}>
                   <Modal.Header closeButton>
                   <Modal.Title>View Task</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                   {this.state.plist !== null ? this.state.plist.map((item:any, i:any) =>
                   <Form>
                       <Form.Group controlId="formBasicSum">
                       <Form.Label>Summary</Form.Label>
                       <Form.Control type="Text" value={item.title} disabled/>
                       </Form.Group>

                       <Form.Group controlId="exampleForm.ControlTextarea1">
                       <Form.Label>Description</Form.Label>
                       <Form.Control as="textarea" value={item.des} />
                       </Form.Group>

                       <Row>
                       <Col>
                       <Form.Group controlId="formBasicSum">
                       <Form.Label>Due</Form.Label>
                       <Form.Control type="Text" value={item.due} disabled/>
                       </Form.Group>
                       </Col>
                       <Col>
                       <Form.Group controlId="formBasicSum">
                       <Form.Label>Priority</Form.Label>
                       <Form.Control type="Text" value={item.priority} disabled/>
                       </Form.Group>
                       </Col>
                       </Row>
                   </Form>

                   
                   
                   ): null}
                 
                   </Modal.Body>
                  
               </Modal>


               <Modal show={this.state.show1} onHide={(e:any) => this.handleClose()} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Task - </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                  <TaskUpdate id={this.state.upkey}/>
                    </Modal.Body>
                   
                </Modal>

                <Modal show={this.state.show2} onHide={(e:any) => this.handleClose()} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Status - </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <StUpdate id={this.state.supkey}/>

                 
                    </Modal.Body>
                   
                </Modal>
           </Container>
    
        ); 
    }
}

export default TaskList;
