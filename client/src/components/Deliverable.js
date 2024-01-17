const Deliverable = (props) => {

  return(
    <div className='project'>
      <h4 style={{marginBottom: '24px'}}>{props.description}</h4>
      <div><b>Due date:</b> {props.dueDate}</div>
      <div><b>Phase:</b> {props.phase}</div>
    </div>
  )
}

export default Deliverable;
