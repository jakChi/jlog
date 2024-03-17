/* eslint-disable react/prop-types */
const Users = ({ data }) => {
  const active = false;

  return (
    <div id="user-list" className="bg-gray-900 text-white rounded-lg p-6 m-3">
      <h2 className="text-2xl font-semibold mb-4">მომხმარებლები:</h2>
      <ol className="list-decimal pl-6">
        {data.map((user, i) => (
          <li key={i} className="text-lg mb-2">
            <span className="inline-block mr-2">{user.email}</span>
            <span
              className={`inline-block ${
                active ? "text-green-400" : "text-red-400"
              }`}
            >
              {active ? "online" : "offline"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Users;
