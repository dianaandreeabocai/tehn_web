import {useEffect, useState} from "react";
import CreateProject from "../components/CreateProject";
import CreateDeliverable from "../components/CreateDeliverable";
import Deliverable from "../components/Deliverable";
import {useNavigate} from "react-router-dom";
import Project from "../components/Project";

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [project, setProject] = useState();
  const [openProject, setOpenProject] = useState(false);
  const [openDeliverable, setOpenDeliverable] = useState(false);
  const [deliverable, setDeliverable] = useState([]);
  const navigate = useNavigate();
  const [showcase, setShowcase] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (user.projectId) {
        const project = await fetch(`http://localhost:4000/project?id=${user.projectId}`);
        setProject(await project.json());
      }
    }
    const fetchDeliverables = async () => {
      if (user.projectId) {
        const deliverable = await fetch(`http://localhost:4000/deliverable?id=${user.projectId}`)
        setDeliverable(await deliverable.json());
      }
    }

    fetchProject().catch(err => console.log(err));
    fetchDeliverables().catch(err => console.log(err));

  }, []);

  const onCreateProjectClose = async (projectPayload) => {
    try {
      if (projectPayload) {
        const createdProject = await createProject(projectPayload)
        createdProject["Evaluators"]=[];
        setProject(createdProject);
        sessionStorage.setItem('user', JSON.stringify({...user, ...{projectId: createdProject.id}}))
      }
      setOpenProject(false);
    } catch (e) {
      console.log(e);
    }
  }

  const createProject = async (payload) => {
    const project = await fetch(`http://localhost:4000/project?id=${user.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await project.json();
  }

  const createDeliverable = async (payload) => {
    const deliverable = await fetch(`http://localhost:4000/deliverable?id=${user.projectId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await deliverable.json();
  }

  const onCreateDeliverableClose = async (payload) => {
    try {
      if (payload) {
        const deliverable = await createDeliverable(payload);
        setDeliverable((prevState) => [...prevState, ...[deliverable]]);
      }
      setOpenDeliverable(false);
    } catch (err) {
      console.log(err);
    }

  }

  const assignEvaluators = async () => {
    await fetch(`http://localhost:4000/evaluator?id=${user.Evaluator.id}&projectId=${user.projectId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    setShowcase(true);
  }

  const goToEvaluation = () => {
    navigate('/grading')
  }

  return (
    <div>
      <header>
        <h4>Welcome {user.username}</h4>
        <div className='actions-list'>
          <button className={project != null ? 'disabled' : ''} onClick={() => setOpenProject(true)}
                  disabled={project != null}>Add
            project
          </button>
          <button className={project == null ? 'disabled' : ''} onClick={() => setOpenDeliverable(true)}
                  disabled={project == null}>Add
            deliverable
          </button>
          <button className={user.Evaluator.projectId == null ? 'disabled' : ''} onClick={goToEvaluation}
                  disabled={user.Evaluator.projectId == null}>Evaluate assigned projects
          </button>
        </div>
      </header>
      <Project project={project} deliverable={deliverable} onUpdate={assignEvaluators} showcase={showcase}/>
      <CreateProject open={openProject} onClose={onCreateProjectClose}/>
      <CreateDeliverable onClose={onCreateDeliverableClose} open={openDeliverable}/>
    </div>

  )
}

export default Dashboard;
