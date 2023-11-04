import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMembers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteATeam = () => {
    if (window.confirm(`Do you want to delete ${teamObj.name} from your roster?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px', border: '3px solid gold' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} className="image" />
      <Card.Body>
        <Card.Title className="nabla">{teamObj.name}</Card.Title>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="dark" className="black">VIEW</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="dark" className="gold">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteATeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
