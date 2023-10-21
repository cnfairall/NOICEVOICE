import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMembers } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';
import { getSingleTeam } from '../../api/teamData';

export default function ViewTeamDetails() {
  const router = useRouter();
  const { user } = useAuth();
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeam);
    getMembers(user.uid).then(setMembers);
  }, []);

  const filteredMembers = members.filter((member) => ((member.teamId) === (firebaseKey)));

  return (
    <>
      <div className="text-center my-4">
        <Card.Img variant="top" src={team.image} alt={team.name} className="image" style={{ width: '400px' }} />
        <Card.Title className="nablaBig">{team.name}</Card.Title>
        <div className="d-flex flex-wrap">

          {filteredMembers.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} />
          ))}
        </div>
      </div>
    </>
  );
}
