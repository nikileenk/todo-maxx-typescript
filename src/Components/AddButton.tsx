import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav,Modal,Button } from 'react-bootstrap';
import './CompStyle.css';
// import TaskCreate from './TaskCreate';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

interface Stateitem{
    show?:boolean,
    history?:any
}
class AddButton extends Component<Stateitem> {

    state = {
        show : false 
    }

    handleShow(){
        this.setState({show:true})
        console.log(this.props)


    }

    handleClose(){
        this.setState({show:false})
        // window.location.href = "/";
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                

                            <div className="addicon" onClick={() => this.handleShow()}>
                            <FontAwesomeIcon icon={faPlus}  />
                            </div>


                <Modal show={this.state.show} onHide={(e:any) => this.handleClose()} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                   {/* <TaskCreate/> */}
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
            </>
        );
    }
}

export default AddButton;