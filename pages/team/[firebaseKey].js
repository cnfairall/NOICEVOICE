import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getTeamMembers } from '../../api/memberData';
// import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';
// import { getSingleTeam } from '../../api/teamData';

export default function ViewTeamDetails() {
  const router = useRouter();
  // const { user } = useAuth();
  const [team, setTeam] = useState({});
  // const [members, setMembers] = useState([]);

  const { firebaseKey } = router.query;
  const filterMembers = () => {
    getTeamMembers(firebaseKey).then(setTeam);
    // getSingleTeam(firebaseKey).then(setTeam);
    // getMembers(user.uid).then(setMembers);
  };
  useEffect(() => {
    filterMembers();
  }, []);
  // const filteredMembers = members.filter((member) => ((member.teamId) === (firebaseKey)));

  return (
    <>
      <Card.Img variant="top" src={team.image} alt={team.name} className="image" />
      <Card.Title className="nabla">{team.name}</Card.Title>
      <div className="d-flex flex-wrap">

        {team.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} />
        ))}
      </div>

    </>
  );
}
