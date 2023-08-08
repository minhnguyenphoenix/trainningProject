import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
// import { getObjectFromProxy } from '../utils/common';

class ticketStore {
  // ticketList = [
  //   {
  //     projectId: '12345',
  //     list: [
  //       {
  //         ticketType: 'feature',
  //         ticketName: 'Create Login Page',
  //         userStories: 0,
  //         lastModified: '05-05-2023',
  //         dateCreated: '02-02-2021',
  //         key: uuidv4(),
  //         id: uuidv4(),
  //       },
  //     ],
  //   },
  // ];

  ticketList = JSON.parse(localStorage?.getItem('ticketList') || `[]`);

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getTicketList = (projectId) => {
    if (!projectId) return [];
    const ticket = this.ticketList?.find((p) => p.projectId === projectId);
    if (!ticket) {
      const newTicketList = [...this.ticketList];
      newTicketList.push({
        projectId: projectId,
        list: [],
      });
      this.ticketList = [...newTicketList];
      localStorage.setItem('ticketList', JSON.stringify(this.ticketList));
      return [];
    } else {
      localStorage.setItem('ticketList', JSON.stringify(this.ticketList));
      return ticket.list;
    }
  };

  getTicketInfo = (projectId, ticketId) => {
    return this.ticketList.find((p) => p.projectId === projectId)?.list.find((t) => t.id === ticketId);
  };

  addTicket = (ticket, projectId) => {
    console.log('zzz', ticket);
    const newTicket = [...this.ticketList];
    return newTicket.find((p) => p.projectId === projectId).list.push({ ...ticket, id: uuidv4(), key: uuidv4() });
  };

  deleteTicket = (ticketId, projectId) => {
    const newTicket = [...this.ticketList];
    const resultDelete = newTicket.find((p) => p.projectId === projectId).list.filter((t) => t.id !== ticketId);
    newTicket.find((p) => p.projectId === projectId)['list'] = resultDelete;
  };

  duplicateTicket = (ticketId, projectId) => {
    const exactTicket = this.ticketList.find((p) => p.projectId === projectId).list;
    const duplicateTicket = exactTicket.find((t) => t.id === ticketId);
    exactTicket.push({
      ...duplicateTicket,
      ticketName: `${duplicateTicket.ticketName} (copy)`,
      key: uuidv4(),
      id: uuidv4(),
    });
  };
}

export default ticketStore;
