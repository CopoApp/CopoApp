import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";

export default function Feed() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      const [data, error] = await getAllUsers();
      if (error) setError(error);
      else if (data) setUsers(data);
    };
    loadReports();
  }, []);

  return (
    <>
      <p>Hello</p>
    </>
  );
}
