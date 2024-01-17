import Deliverable from "./Deliverable";

const Project = ({project, deliverable, showcase, onUpdate}) => {
  return(
    <div className='container'>
      <div className='projectContainer'>
        <h2 style={{paddingLeft: '16px', color: 'var(--white)', marginBottom: '16px'}}>Project:</h2>
        {!project && <h6 style={{padding: '16px', color: 'var(--white)'}}>You don't have any projects yet</h6>}
        {project && <div className='projectWrapper'>
          <div className='project' style={{maxWidth: '500px'}}>
            <h2 style={{marginBottom: '24px'}}>{project.name}
              {(!showcase && project.Evaluators?.length === 0) &&
                <button style={{float: 'right'}} onClick={() => onUpdate()}>Assign random evaluators</button>}
            </h2>
            <div><b>Project name:</b> {project.name}</div>
            <div><b>Description:</b> {project.description}</div>
            <div><b>ExternalUrl:</b> <a href={project.externalUrl}>{project.externalUrl}</a></div>
            {project.videoUrl && <div style={{display: "flex", flexDirection: 'column'}}><b>Project demo:</b>
              <iframe height="300" width="500"
                      src={project.videoUrl}>
              </iframe>
            </div>}
          </div>
        </div>}
      </div>
      <div>
        <h2 style={{marginBottom: '16px', color: 'var(--white)'}}>Deliverables:</h2>
        {(!deliverable || deliverable.length === 0) &&
          <h6 style={{paddingTop: '16px', color: 'var(--white)'}}>You don't have any deliverables yet</h6>}

        <div className='delivearblesList'>{deliverable?.length > 0 && deliverable.map((item) =>
          <Deliverable key={item.id} description={item.description} dueDate={item.dueDate} phase={item.phase}/>
        )}</div>
      </div>
    </div>
  )
}

export default Project;
