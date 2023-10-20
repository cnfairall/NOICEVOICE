import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <h1 className="nabla">TEAMs</h1>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>

    </div>
  );
}

export default ShowTeams;
