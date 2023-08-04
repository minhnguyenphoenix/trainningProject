import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

class projectStore {
  projectList = [
    {
        id: uuidv4(),
        name: 'Project 1',
        createdBy: 'Admin',
        tickets: 2,
        lastModified: '2023-07-16',
        dateCreated: moment().format('DD-MM-YYYY'),
        key: uuidv4(),
    },
    {
        id: uuidv4(),
        name: 'Project 2',
        createdBy: 'Admin',
        tickets: 0,
        lastModified: '2023-07-16',
        dateCreated: moment().format('DD-MM-YYYY'),
        key: uuidv4(),
    },
    {
        id: 1234,
        name: 'Project 3',
        createdBy: 'Admin',
        tickets: 1,
        lastModified: '2023-07-16',
        dateCreated: moment().format('DD-MM-YYYY'),
        key: uuidv4(),
    }
  ]

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getProjectList = () => {
    return this.projectList;
  };

  addProject = (project) => {
    const newList = [...this.projectList]
    newList.push({...project, id: uuidv4(), key: uuidv4()});
    this.projectList = newList;
  };

  duplicateProject = (project) => {
    const newList = [...this.projectList]
    newList.push({...project, name: `${project.name} (copy)`, id: uuidv4(), key: uuidv4()});
    this.projectList = newList;
  }

  getProject = (id) => {
    this.projectList.find(project => project.id === id)
  }

  deleteProject = (id) => {
    this.projectList = this.projectList.filter((p) => p.id !== id);
  }

}

export default projectStore;
