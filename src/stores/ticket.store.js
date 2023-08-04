import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';

class ticketStore {
  ticketList = [
    {
        projectId: 'projectId1',
        type: 'feature',
        name: 'Create Login Page',
        userStories: 3,
        lastModified: '05-05-2023',
        dateCreated: '02-02-2021',
        key: uuidv4()
    },
    {
        projectId: 'projectId2',
        type: 'bug',
        name: 'Ticket1',
        userStories: 1,
        lastModified: '05-05-2023',
        dateCreated: '02-02-2021',
        key: uuidv4()
    },
    {
        projectId: 'projectId3',
        type: 'other',
        name: 'Ticket2',
        userStories: 2,
        lastModified: '05-05-2023',
        dateCreated: '02-02-2021',
        key: uuidv4()
    }
  ]

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getTicketList = () => {
    return this.ticketList;
  };

  getTicketInfo = (id) => {
    this.ticketList.find(ticket => ticket.id === id)
  }

  addTicket = (ticket) => {
    const newList = [...this.ticket]
    newList.push({...ticket, id: uuidv4(), key: uuidv4()});
    this.ticketList = newList;
  };

  duplicateTicket = (ticket) => {
    const newList = [...this.ticket]
    newList.push({...ticket, name: `${ticket.name} (copy)` , id: uuidv4(), key: uuidv4()});
    this.ticketList = newList;
  }

  deleteTicket = (id) => {
    this.ticketList = this.ticketList.filter((p) => p.id !== id);
  }

}

export default ticketStore;
