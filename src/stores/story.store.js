import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';

class storyStore {
  storyList = [
    {
        image: [ { name: 'test', url: 'http://blabla.com/'}],
        description: 'description'
    },
  ]

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getStoryList = () => {
    return this.storyList;
  };

  addStory = (story) => {
    const newList = [...this.storyList]
    newList.push({...story, id: uuidv4(), key: uuidv4()});
    this.storyList = newList;
  };

  deleteStory = (id) => {
    this.storyList = this.storyList.filter((t) => t.id !== id);
  }

}

export default storyStore;
