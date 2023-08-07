import projectStore from './project.store';
import ticketStore from './ticket.store';
import storyStore from './story.store';
import React from 'react';

class RootStore {
  constructor() {
    this.projectStore = new projectStore(this);
    this.ticketStore = new ticketStore(this);
    this.storyStore = new storyStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
