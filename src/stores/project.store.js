import { computed, makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

class projectStore {
  // projectList = [
  //   {
  //     id: uuidv4(),
  //     name: 'Project 1',
  //     createdBy: 'Admin',
  //     tickets: 2, // TODO: write function get length of tickets ouside table component
  //     lastModified: '2023-07-16',
  //     dateCreated: moment().format('DD-MM-YYYY'),
  //     key: uuidv4(),
  //   },
  // ];
  projectList = JSON.parse(localStorage?.getItem('projectList') || `[]`);
  textSearch = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      searchProject1: computed
    });
  }



  getProjectList = () => {
    return this.projectList;
  };

  addProject = (project) => {
    const newList = [...this.projectList];
    newList.push({ ...project, id: uuidv4(), key: uuidv4() });
    this.projectList = newList;
  };

  duplicateProject = (id) => {
    const newList = [...this.projectList];
    const duplicateProject = newList.find((p) => p.id === id);
    newList.push({
      ...duplicateProject,
      name: `${duplicateProject.name} (copy)`,
      id: uuidv4(),
      key: uuidv4(),
      lastModified: moment().format('DD-MM-YYYY'),
      dateCreated: moment().format('DD-MM-YYYY'),
    });
    this.projectList = newList;
  };

  getProject = (id) => {
    return this.projectList.find((project) => project.id === id);
  };

  deleteProject = (id) => {
    this.projectList = this.projectList.filter((p) => p.id !== id);
  };

  implementTextSearch = (text) => {
    this.textSearch = text;
  };

  get searchProject() {
    let filteredList = this.projectList.filter((project) => project.name.toLowerCase().includes(this.textSearch?.toLowerCase()));
    console.log('filteredList', filteredList);
    if (filteredList.length) return filteredList;
    return this.projectList;
  }
}

export default projectStore;
