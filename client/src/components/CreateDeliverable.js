import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";


function CreateDeliverable(props) {
  const { onClose, open } = props;
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [phase, setPhase] = useState('');

  const handleClose = () => {
    const payload = {description, phase, dueDate};
    if(Object.keys(payload).some((key) => payload[key] === '')){
      onClose()
    } else {
      onClose({description, phase, dueDate});
    }

  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><div style={{margin: '0 auto'}}>Add deliverable</div></DialogTitle>
      <div className='dialogBody'>
        <label htmlFor="description">Description</label>
        <input type="text" id="name" name="name" placeholder="Description"
               onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="description">Due date</label>
        <input type='date' onChange={(e) => setDueDate(e.target.value)} />
        <label htmlFor="phase">Phase</label>
        <input type="text" id="phase" name="phase" placeholder="Phase"
               onChange={(e) => setPhase(e.target.value)} />
        <button style={{width:"50%", margin: '16px 0'}} onClick={() => handleClose()}>Create</button>
      </div>
    </Dialog>
  );
}

CreateDeliverable.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CreateDeliverable;
