import React, { Component } from 'react';
import { Container,Tab,Tabs,Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskList from './TaskList';
import TaskCreate from './TaskCreate';

interface Stateitem{
    show?:boolean,
    history?:any
}

class Home extends Component<Stateitem> {

    state ={
        key:"home",
        show : false,
        refresh:"ref"
    }

    componentDidMount() {
        console.log(this.props.history)
       
    }
    

    search = (e:any) =>{
            this.setState({key:e.target.value})
    }

    handleShow(){
        this.setState({show:true})
        console.log(this.props)


    }

    handleClose(){
        this.setState({show:false,refresh:Math.random()});
        // window.location.href = "/";

        // this.props.history.push('/');
        
    }
    render() {
        return (
            <Container>
               <div className="addicon" onClick={() => this.handleShow()}>
                <FontAwesomeIcon icon={faPlus}  />
                </div>
                <br/><br/>

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({key:k})}>
                    <Tab eventKey="" title="All">
                 
                    </Tab>
                    <Tab eventKey="Pending" title="Pending" >
                  
                    </Tab>

                    <Tab eventKey="Completed" title="Completed">
                   
                    </Tab>
                    
                </Tabs>

              

              <TaskList stat={this.state.key} refresh={this.state.refresh}/>

              <Modal show={this.state.show} onHide={(e:any) => this.handleClose()} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                  <TaskCreate/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleClose()}>
                        Save Changes
                    </Button>
                    </Modal.Footer> */}
                </Modal>

            </Container>

            
        )
    }
}

export default Home;
