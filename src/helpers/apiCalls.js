export const firstApiCall = async () => {
  try {
    const initialFetch = await fetch('http://localhost:3001/api/v1/houses');
    return initialFetch.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getSwornMembers = async swornMembers => {
  const membersPromises = swornMembers.map( async member => {
    const initialFetch = await fetch(member, {
      method: 'GET'
    })
    return await initialFetch.json();
  })

  return await Promise.all(membersPromises)
}