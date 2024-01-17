import {useEffect, useState} from "react";

const Results = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRequest = await fetch(`http://localhost:4000/project/all`);
      setProjects(await projectsRequest.json());
    }
    fetchProjects().catch(console.log);
  }, [])

  return (
    <>
      <div className='intro'>
        <h2>Welcome professor</h2>
        <h4>Below you can find all projects that were enrolled into this app:</h4>
      </div>
      <div className='resultsWrapper'>
        {
          projects.map(
            (project) =>
              <div key={project.id}>
                <div className='project'>
                  <h2 style={{marginBottom: '24px'}}>{project.name}</h2>
                  <div><b>Project name:</b> {project.name}</div>
                  <div><b>Description:</b> {project.description}</div>
                  <div><b>ExternalUrl:</b> <a href={project.externalUrl}>{project.externalUrl}</a></div>
                  <div><b>Grades:</b> {project.Evaluators && project.Evaluators.length > 0 ? project.Evaluators.map((evaluator) =>
                    <span key={evaluator.id}
                          style={{paddingRight: '8px'}}>{evaluator.grade === 0 ? 'N/A' : evaluator.grade}
            </span>): 'No grades yet'}</div>
                  <div><b>Average:</b>{project.Evaluators && project.Evaluators.length > 0 ?
                    project.Evaluators.reduce((acc, curr)=>{
                      return acc + curr.grade;
                    },0)/ project.Evaluators.filter((projectEval) => projectEval.grade > 0).length :
                    'No evaluators assigned'}</div>
                  {project.videoUrl && <div style={{display: 'flex', flexDirection: 'column'}}><b>Video:</b>
                    <iframe width="200" height="150"
                            src={project.videoUrl}>
                    </iframe>
                  </div>}
                </div>
              </div>)
        }
      </div>
    </>
  )
}

export default Results;
