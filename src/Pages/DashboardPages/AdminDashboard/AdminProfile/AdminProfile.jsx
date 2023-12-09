import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import { useQuery } from "@tanstack/react-query";
import AdminInfo from "./AdminInfo";
import { MdLocalPostOffice } from "react-icons/md";
import { FaCommentDots, FaUserFriends } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminProfile = () => {
  const privetAxios = usePrivetAxios();
  //   const [admin, setAdmin] = useState(null);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await privetAxios.get(`/users?role=admin`);
      return res.data;
    },
  });

  const { data: stats = [], refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await privetAxios.get(`/admin-stats`);
      return res.data;
    },
  });

    // console.log(stats);
  const data = [
    { name: "users", value: stats?.users },
    { name: "posts", value: stats?.posts },
    { name: "Comments", value: stats?.comments },
  ];

  //pieChart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <div className="px-4 py-8 bg-[#010313] text-white space-y-8">
      <h2 className="text-2xl font-bold">
        Hi, <span className="text-orange-700">Welcome Back!</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex justify-center items-center space-x-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-8 rounded-lg">
          <span className="text-5xl">
            <MdLocalPostOffice></MdLocalPostOffice>
          </span>
          <div>
            <h2 className="text-2xl font-bold">00{stats?.posts}</h2>
            <p className="text-lg font-bold">Posts</p>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-5 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] px-8 py-8 rounded-lg">
          <span className="text-5xl">
            <FaUserFriends></FaUserFriends>
          </span>
          <div>
            <h2 className="text-2xl font-bold">00{stats?.users}</h2>
            <p className="text-lg font-bold">Users</p>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-5 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] px-8 py-8 rounded-lg">
          <span className="text-5xl">
            <FaCommentDots></FaCommentDots>
          </span>
          <div>
            <h2 className="text-2xl font-bold">00{stats?.comments}</h2>
            <p className="text-lg font-bold">Comments</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-7">
          {users?.map((user) => (
            <AdminInfo key={user?._id} user={user}></AdminInfo>
          ))}
        </div>

        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
