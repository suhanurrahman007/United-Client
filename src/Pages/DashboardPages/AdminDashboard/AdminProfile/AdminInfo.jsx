import img from "../../../../assets/Login/placeholder.jpg"
const AdminInfo = ({user}) => {
    console.log(user);
    return (
      <div className="flex items-center space-x-4">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={user?.image ? user?.image : img} />
          </div>
        </div>
        <div>
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-400 text-justify">{user?.email}</p>
        </div>
      </div>
    );
};

export default AdminInfo;