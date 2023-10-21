import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';
import { getMemberTeam } from '../api/mergedData';

export default function MemberCard({ memberObj, onUpdate }) {
  const [team, setTeam] = useState({});

  useEffect(() => (
    getMemberTeam(memberObj.firebaseKey).then(setTeam)
  ), []);
  console.warn(team);

  const deleteAMember = () => {
    if (window.confirm(`Do you want to delete ${memberObj.name} from your team?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px', border: '3px solid gold' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} className="image" />
      <Card.Body>
        <Card.Title className="nabla">{memberObj.name}</Card.Title>
        <Card.Title>{team.name}</Card.Title>
        <Card.Text>{memberObj.role}</Card.Text>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="dark" className="gold">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteAMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
