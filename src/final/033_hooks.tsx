import React from 'react';

interface Props {
  id: number;
}

interface UserType {
  id: number;
  name: string;
}

function User(props: Props) {
  const [user, setUser] = React.useState<UserType | null>(null);

  React.useEffect(() => {
    let abortController: AbortController | null;
    const fetchUser = async () => {
      abortController = new AbortController();
      try {
        const response = await fetch(`/api/user/${props.id}`, {
          signal: abortController.signal,
        });
        abortController = null;
        if (response.status < 400) {
          const user = await response.json();
          setUser(user);
        } else if (response.status === 404) {
          setUser({ id: -1, name: 'Not found' });
        } else {
          setUser({ id: -1, name: 'Error' });
          throw response;
        }
      } catch (err) {
        console.error(err);
      }
    };
    setUser(null);
    fetchUser();
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [props.id]);

  return <div>{user?.name || 'loading...'}</div>;
}

export class _User extends React.Component<Props, { user: UserType | null }> {
  abortController: AbortController | null = null;

  state: { user: UserType | null } = { user: null };

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  async fetchUser() {
    this.setState({ user: null });
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();
    try {
      const response = await fetch(`/api/user/${this.props.id}`, {
        signal: this.abortController.signal,
      });
      this.abortController = null;
      if (response.status < 400) {
        const user = await response.json();
        this.setState({ user });
      } else if (response.status === 404) {
        this.setState({ user: { id: -1, name: 'Not found' } });
      } else {
        this.setState({ user: { id: -1, name: 'Error' } });
        throw response;
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return <div>{this.state.user?.name || 'loading...'}</div>;
  }
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
