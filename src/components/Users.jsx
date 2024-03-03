/* eslint-disable react/prop-types */
const Users = ({ data }) => {
  const active = false;

  return (
    <div id="user-list">
      <h2>მომხმარებლები:</h2>
      <ol>
        {data.map((user, i) => (
          <li key={i}>
            {user.email} - {active ? " online" : " offline"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Users;
