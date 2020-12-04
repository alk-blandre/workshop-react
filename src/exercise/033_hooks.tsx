import React from 'react';

interface Props {
  id: number;
}

interface UserType {
  id: number;
  name: string;
}

/**
 * Fetch user data to display user name
 * Use fetch and useEffect API
 * Here how to fetch the data (there are 2 ways):
 *  1) // In an async function
 *     const response = await fetch(`/api/user/${id}`)
 *     const user = await response.json()
 *  2) fetch(`/api/user/${id}`)
 *       .then((response) => response.json())
 *       .then((user) => console.log(user))
 * Display "loading..." when the request starts
 * Handle errors (404)
 * A request cancels the previous request logic if previous request is still in progress
 */

function User(props: Props) {
  const [user] = React.useState<UserType | null>(null);
  return <div>{user?.name}</div>;
}

export default function Hooks() {
  const users = [{ id: 24 }, { id: 42 }, { id: 666 }];
  const [userId, setUserId] = React.useState(users[1].id);
  return (
    <>
      <p>
        {users.map((user, index) => (
          <label
            key={user.id}
            htmlFor={`user#${user.id}`}
            style={{ paddingLeft: index > 0 ? '1em' : '0' }}
          >
            <input
              type="radio"
              id={`user#${user.id}`}
              value={user.id}
              checked={userId === user.id}
              onChange={() => setUserId(user.id)}
            />
            &nbsp;{user.id}
          </label>
        ))}
      </p>
      <User id={userId} />
    </>
  );
}
