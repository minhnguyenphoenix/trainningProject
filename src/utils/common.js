export const getObjectFromProxy = (value) => JSON.parse(JSON.stringify(value));

export const getTicketLength = (value) => {
  // GET Length of ticket array from projectID
  const oj = getObjectFromProxy(value);
  const { id: projectId } = oj;
  const ticketList = JSON.parse(localStorage.getItem('ticketList')) || [];
  return ticketList.find((p) => p.projectId === projectId)?.list.length || 0;
};

export const getUserStoryLength = (value) => {
  return value?.storyList?.length || 0;
};

export const stranformText = (value) => {
  const { ticketType } = value;
  return ticketType.charAt(0).toUpperCase() + ticketType.slice(1);
};
