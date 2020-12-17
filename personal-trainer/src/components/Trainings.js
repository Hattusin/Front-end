import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';


function Training() {
    

    const [training, setTrainings] = useState([]);
    
    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
   


    const columns = [
        {field: 'customer.lastname' , field: 'customer.firstname',  headerName: 'Customer Firstname', sortable: true, filter: true,
        cellRenderer: params => {
            var firstname = params.getValue('customer.firstname');
            var lastname = params.getValue('customer.lastname');
            return (firstname + " " + lastname);
        }},
        //{field: 'customer.lastname', headerName: 'Customer Lastname', sortable: true, filter: true},
        {field: 'duration', headerName:'Duration (min)',  sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true,
        cellRenderer: params => {
            return moment(params.getValue('date')).format('DD.MM.YYYY HH:mm')
        } }
    ]


    return(
        <div>
            <h3>Training</h3>
            <div className="ag-theme-material" style={ { height: 600, width: '70%', margin: 'auto' } }>
                <AgGridReact
                    rowData={training}
                    columnDefs={columns}
                    pagination = 'true'
                    paginationPageSize="15"
                >
                </AgGridReact>
            </div>
        </div>

    )
}

export default Training;