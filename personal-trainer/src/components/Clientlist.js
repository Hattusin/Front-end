import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';





function Clientlist() {
    

    const [clients, setClients] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    useEffect(() => {
        getClients();
    }, [])

    const getClients = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setClients(data.content))
        .catch(err => console.error(err))
    }


    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
    ]


    return(
        <div>
            <h3>Customers</h3>
            <div className="ag-theme-material" style={ { height: 600, width: '100%', margin: 'auto' } }>
                <AgGridReact
                    rowData={clients}
                    columnDefs={columns}
                    pagination = 'true'
                    paginationPageSize="10"
                >
                </AgGridReact>
            </div>
        </div>

    )
}

export default Clientlist;