export const firstApiCall = async () => {
  try {
    const initialFetch = await fetch('http://localhost:3001/api/v1/houses');
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error(initialFetch.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getSwornMembers = async swornMembers => {
  try {
    const membersPromises = await swornMembers.map( async member => {
      const initialFetch = await fetch(member, {
        method: 'GET'
      });
      return await initialFetch.json();
    });
    const swornMembersResolved = await Promise.all(membersPromises);
    return cleanSwornMembers(swornMembersResolved); 
  } catch (error) {
    throw new Error(error);
  }
};

const cleanSwornMembers = swornMembers => {
  const memberNames = swornMembers.map( member => {
    return member.name;
  } );

  return memberNames.join(', ');
};