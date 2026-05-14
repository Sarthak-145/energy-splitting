import { useEffect, useState } from 'react';

import { getAllReadings } from '../api/dataApi';

import { toggleRelay } from '../api/deviceApi';

import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [readings, setReadings] = useState([]);

  const [relay, setRelay] = useState(false);

  const [loading, setLoading] = useState(true);

  // FETCH SENSOR DATA
  const fetchReadings = async () => {
    try {
      const data = await getAllReadings();

      setReadings(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();

    // optional polling
    const interval = setInterval(() => {
      fetchReadings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // RELAY TOGGLE
  const handleRelayToggle = async () => {
    try {
      const newState = !relay;

      await toggleRelay(1, newState);

      setRelay(newState);
    } catch (error) {
      console.error(error);
    }
  };

  // LATEST READING
  const latest = readings[0];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* TOPBAR */}
      <div
        className="
        border-b
        border-cyan-900
        px-8
        py-5
        flex
        items-center
        justify-between
      "
      >
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            Smart Energy Dashboard
          </h1>

          <p className="text-gray-400 mt-1">Monitor power usage in real time</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Logged in as</p>

            <p className="font-semibold">{user?.name}</p>
          </div>

          <button
            onClick={logout}
            className="
              bg-red-500
              hover:bg-red-600
              px-4
              py-2
              rounded-xl
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* STATS */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-8
        "
        >
          {/* Voltage */}
          <div
            className="
            bg-[#0b1220]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
          >
            <p className="text-gray-400 mb-2">Voltage</p>

            <h2 className="text-4xl font-bold text-cyan-400">
              {latest?.voltage || 0}V
            </h2>
          </div>

          {/* Current */}
          <div
            className="
            bg-[#0b1220]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
          >
            <p className="text-gray-400 mb-2">Current</p>

            <h2 className="text-4xl font-bold text-cyan-400">
              {latest?.current || 0}A
            </h2>
          </div>

          {/* Power */}
          <div
            className="
            bg-[#0b1220]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
          >
            <p className="text-gray-400 mb-2">Power</p>

            <h2 className="text-4xl font-bold text-cyan-400">
              {latest?.power || 0}W
            </h2>
          </div>

          {/* Energy */}
          <div
            className="
            bg-[#0b1220]
            border
            border-cyan-900
            rounded-2xl
            p-6
          "
          >
            <p className="text-gray-400 mb-2">Energy</p>

            <h2 className="text-4xl font-bold text-cyan-400">
              {latest?.energy || 0}kWh
            </h2>
          </div>
        </div>

        {/* RELAY CONTROL */}
        <div
          className="
          bg-[#0b1220]
          border
          border-cyan-900
          rounded-2xl
          p-6
          mb-8
        "
        >
          <div
            className="
            flex
            items-center
            justify-between
          "
          >
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">
                Power Control
              </h2>

              <p className="text-gray-400 mt-1">
                Enable or disable the smart outlet
              </p>
            </div>

            <button
              onClick={handleRelayToggle}
              className={`
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
                ${
                  relay
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-black'
                }
              `}
            >
              {relay ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>
        </div>

        {/* READINGS TABLE */}
        <div
          className="
          bg-[#0b1220]
          border
          border-cyan-900
          rounded-2xl
          p-6
        "
        >
          <h2
            className="
            text-2xl
            font-bold
            text-cyan-400
            mb-6
          "
          >
            Recent Readings
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="
                        text-left
                        border-b
                        border-cyan-900
                      "
                  >
                    <th className="pb-4">Voltage</th>
                    <th className="pb-4">Current</th>
                    <th className="pb-4">Power</th>
                    <th className="pb-4">Energy</th>
                    <th className="pb-4">PF</th>
                  </tr>
                </thead>

                <tbody>
                  {readings.map((reading) => (
                    <tr
                      key={reading.id}
                      className="
                              border-b
                              border-[#101827]
                            "
                    >
                      <td className="py-4">{reading.voltage}V</td>

                      <td className="py-4">{reading.current}A</td>

                      <td className="py-4">{reading.power}W</td>

                      <td className="py-4">{reading.energy}kWh</td>

                      <td className="py-4">{reading.pf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
