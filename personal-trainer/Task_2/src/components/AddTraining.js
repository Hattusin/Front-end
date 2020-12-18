import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        duration:'', 
        date: '',
        activity: '',
        customer: props.params.data.links[1].href
    });
    console.log(props.params.data.links[1].href)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log(training);
        props.addTraining(training);
        handleClose(); 
    };

    const inputChanged = (event) => {
        setTraining({...training,[event.target.name]: event.target.value});
        
    };


    return(
        <div>
            <Button  size="small" color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training ({props.params.data.firstname+ ' ' + props.params.data.lastname})</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    label="Activity"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Duration (min)"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    fullWidth
                />
                <form noValidate>
                <TextField
                    margin="dense"
                    label="Date"
                    name="date"
                    type="datetime-local"
                    value={training.date}
                    onChange={inputChanged}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>


               
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

export default AddTraining;