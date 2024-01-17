import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";


function CreateProject(props) {
  const { onClose, open } = props;
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [externalUrl, setExternalUrl] = useState('');

  const handleClose = () => {
    const payload = {description, name, videoUrl, externalUrl};
    if(Object.keys(payload).some((item) => payload[item] === '')) {
      onClose()
    } else {
      onClose({description, name, videoUrl, externalUrl});
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><div style={{margin: '0 auto'}}>Create Project</div></DialogTitle>
      <div className={'dialogBody'}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Project name"
               onChange={(e) => setName(e.target.value)} />
        <label htmlFor="description">Description</label>
        <textarea style={{minWidth: '50%'}} id="description" name="email" placeholder="Project description"
                  onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="video">Video Url</label>
        <input type="text" id="video" name="videoUrl" placeholder="Video url"
               onChange={(e) => setVideoUrl(e.target.value)} />
        <label htmlFor="external">External Url</label>
        <input type="text" id="external" name="external" placeholder="External url"
               onChange={(e) => setExternalUrl(e.target.value)} />
        <button style={{width:"50%", marginBottom: '16px'}} onClick={() => handleClose()}>Create</button>
      </div>
    </Dialog>
  );
}

CreateProject.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CreateProject;
