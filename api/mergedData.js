import { deleteMember, getSingleMember, getTeamMembers } from './memberData';
import { deleteTeam, getSingleTeam } from './teamData';

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getMemberTeam = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      getSingleTeam(memberObj.teamId)
        .then((teamObj) => {
          resolve({ teamObj });
        });
    }).catch((error) => reject(error));
});

export { deleteTeamMembers, getMemberTeam };
