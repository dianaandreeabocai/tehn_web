import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import project from "./Project";


function Grade(props) {
  const { onClose, open } = props;
  const [grade, setGrade] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const addGrade = async () => {
    onClose(grade);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><div style={{margin: '0 auto'}}>Create Project</div></DialogTitle>
      <div className={'dialogBody'}>
        <label htmlFor="grade">Grade</label>
        <input type="number" id="grade" name="grade"
               onChange={(e) => setGrade(parseFloat(e.target.value))} />
        <button style={{width:"50%", marginBottom: '16px'}} onClick={() => addGrade()}>Create</button>
      </div>
    </Dialog>
  );
}

Grade.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default Grade;
