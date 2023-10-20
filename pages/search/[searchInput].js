import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { searchMembers } from '../../api/memberData';
import MemberCard from '../../components/MemberCard';

export default function Search() {
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllMembers = () => {
    searchMembers(searchInput, user.uid).then(setFilteredMembers);
  };

  useEffect(() => {
    searchAllMembers();
    return () => {
      setFilteredMembers([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {filteredMembers.map((member) => <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={searchAllMembers} />)}
      </div>
    </>

  );
}
