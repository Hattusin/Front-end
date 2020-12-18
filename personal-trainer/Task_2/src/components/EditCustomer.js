import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CreateIcon from '@material-ui/icons/Create';

function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname:'',
        lastname:'', 
        streetaddress:'', 
        postcode:'', 
        city:'', 
        email:'',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        console.log(props.params)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(props.params.value, customer);
        handleClose();
    };

    const inputChanged = (event) => {
        setCustomer({...customer,[event.target.name]: event.target.value});
    };

    return(
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                <CreateIcon fontSize="small" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    label="Firstname"
                    name="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Lastname"
                    name="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Streetaddress"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Postcode"
                    name="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                />
                <TextField
                    margin="dense"
                    label="City"
                    name="city"
                    value={customer.city}
                    onChange={inputChanged}
                    fullWidth
                    required = {true}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    value={customer.email}
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    name="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditCustomer;