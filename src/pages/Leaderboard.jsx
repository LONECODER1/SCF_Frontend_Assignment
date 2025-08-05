import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [totalDonations, setTotalDonations] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://scf-backend-assignment.onrender.com/api/leaderboard");
                const data = await response.json();
                const sortedData = data.sort((a, b) => b.amountRaised - a.amountRaised);
                setUsers(sortedData);

                const total = sortedData.reduce((acc, user) => acc + (user.amountRaised || 0), 0);
                setTotalDonations(total);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f4f4] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-10">
                <h1 className="text-4xl font-bold text-center text-gray-900">Intern Leaderboard</h1>

                <div className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-black bg-clip-text text-transparent">
                    ₹{totalDonations.toLocaleString()}
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul role="list" className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <li key={user._id} className="px-6 py-4 flex items-center justify-between">
                                <div className="text-lg font-medium text-gray-900">
                                    #{index + 1} {user.name}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{user.referralCode}</p>
                                    <p className="text-lg font-bold text-gray-800">₹{user.amountRaised}</p>
                                </div>
                            </li>
                        ))}
                        {users.length === 0 && (
                            <li className="px-6 py-4 text-center text-gray-500">No data available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
