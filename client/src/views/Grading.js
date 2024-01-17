import {useEffect, useState} from "react";
import Project from "../components/Project";
import Grade from "../components/Grade";
import project from "../components/Project";

const Grading = () => {
  const {Evaluator: evaluator} = JSON.parse(sessionStorage.getItem('user'))
  const [project, setProject] = useState();
  const [deliverable, setDeliverable] = useState([]);
  const [open, setOpen] = useState(false);
  const [graded, setGraded] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (evaluator.projectId) {
        const project = await fetch(`http://localhost:4000/project?id=${evaluator.projectId}`);
        setProject(await project.json());
      }
    }
    const fetchDeliverables = async () => {
      if (evaluator.projectId) {
        const deliverable = await fetch(`http://localhost:4000/deliverable?id=${evaluator.projectId}`)
        setDeliverable(await deliverable.json());
      }
    }

    fetchProject().catch(err => console.log(err));
    fetchDeliverables().catch(err => console.log(err));

  }, []);

 const handleGradeClose = async (grade) => {
    if(grade) {
      const request = await fetch('http://localhost:4000/evaluator/grade', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({grade, evaluatorId: evaluator.id})
      })
      setGraded(true);
    }
    setOpen(false);
  }


  return (
    <>
      <header>
        <h6>You have to evaluate the following project</h6>
        <div className='actions-list'>
          <button className={project == null || graded  || evaluator?.grade !== 0 ? 'disabled' : ''}
                  disabled={project == null || graded  || evaluator?.grade !== 0}
          onClick={() => setOpen(true)}
          >Evaluate
            project
          </button>
        </div>
      </header>
      {project && <Project project={project} deliverable={deliverable} showcase={true}/>}
      <Grade onClose={handleGradeClose} open={open} />
    </>
  )
}

export default Grading;
