import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';


function Clientlist() {
    

    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        getClients();
    }, [])

    const getClients = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setClients(data.content))
        .catch(err => console.error(err))
    }


    const deleteClient = (params) => {
        
        if(window.confirm("Are you sure you want to delete customer " +  params.data.firstname + ' ' + params.data.lastname +'?')){
            fetch(params.value[0].href,{
                method: 'DELETE'
            })
            .then(_ => getClients())
            .then(_ => handleOpen(),
            setMessage("Customer "+ params.data.firstname + ' ' + params.data.lastname + " information deleted."))
            .catch(err => console.error(err))
        }
    }

    //Snakbar
    const handleOpen = () => {
        setOpen(true);
    }
    //Snakbar
    const handleClose = () => {
        setOpen(false);
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => getClients(),
        setMessage("Added customer "+ newCustomer.firstname + ' ' + newCustomer.lastname + " information."))
        .then(_ => handleOpen())
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, client) => {
        fetch(link[0].href, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(client)
        })
        .then(response => getClients(),
        setMessage("Updated "+ client.firstname + ' ' + client.lastname + " informations."))
        .then(_ => handleOpen())
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => getClients(),
        setMessage("Added training to customer."))
        .then(_ => handleOpen())
        .catch(err => console.error(err))
    }
   



    const columns = [
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 140},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field:'links',
            width: 130,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params}/>
        },
        {
            headerName: '',
            width: 70,
            field:'links',
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
        },
        {
            headerName: '',
            width:70,
            field: 'links',
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteClient(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        }
    ]


    return(
        <div>
            <h3>Customers</h3>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={ { height: 600, width: '100%', margin: 'auto' } }>
                <AgGridReact
                    rowData={clients}
                    columnDefs={columns}
                    pagination = 'true'
                    paginationPageSize="10"
                >
                </AgGridReact>
            </div>
            <Snackbar 
             open = {open}
             onClose={handleClose}
             autoHideDuration={2500}
             message={message}
            />
        </div>

    )
}

export default Clientlist;