"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const Allusers = (props: any) => {
  const [allUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getall-users"
        );
        const allUsers = response.data;
        setAllUsers(allUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {allUsers.map((user: any) => (
        <div key={user._id}>
          <User user={user} />
        </div>
      ))}
    </div>
  );
};

const User = ({ user }: any) => {
  return (
    <div>
      <img src={user?.picturePic} alt="img" />
      <p>{user.username}</p>
      <p>{user?.email} </p>
    </div>
  );
};

export default Allusers;
