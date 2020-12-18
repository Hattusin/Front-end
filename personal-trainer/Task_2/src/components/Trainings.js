import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';


function Training() {

    const [training, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteClient = (params) => {
        console.log(params);
        if(window.confirm("Are you sure you want to delete training from " +  params.data.customer.firstname + ' ' + params.data.customer.lastname +'?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/'+params.data.id,{
                method: 'DELETE'
            })
            .then(_ => getTrainings(),
            setMessage("Customer "+ params.data.customer.firstname + ' ' + params.data.customer.lastname + " training information deleted."))
            .then(_ => handleOpen())
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

    const columns = [
        {field: 'customer.lastname', field:'cutomer.firstname', headerName: 'Customer Firstname', sortable: true, filter: true,
        cellRenderer: params => {
            return params.data.customer.firstname + ' ' + params.data.customer.lastname
        }},
        //{field: 'customer.lastname', headerName: 'Customer Lastname', sortable: true, filter: true},
        {field: 'duration', headerName:'Duration (min)',  sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true,
        cellRenderer: params => {
            return moment(params.getValue('date')).format('DD.MM.YYYY HH:mm')
        } },
        {
            headerName: '',
            width:70,
            field: 'id',
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteClient(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        }
    ]


    return(
        <div>
            <h3>Training</h3>
            <div className="ag-theme-material" style={ { height: 600, width: '60%', margin: 'auto' } }>
                <AgGridReact
                    rowData={training}
                    columnDefs={columns}
                    pagination = 'true'
                    paginationPageSize="15"
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

export default Training;