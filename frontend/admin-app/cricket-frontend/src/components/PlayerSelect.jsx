export default function PlayerSelect({
  players, striker, nonStriker, bowler,
  setStriker, setNonStriker, setBowler
}) {
  return (
    <div className="space-y-3 mb-4">
      <select
        className="p-2 border w-full"
        value={striker}
        onChange={(e) => setStriker(e.target.value)}
      >
        <option>Select Striker</option>
        {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select
        className="p-2 border w-full"
        value={nonStriker}
        onChange={(e) => setNonStriker(e.target.value)}
      >
        <option>Select Non-Striker</option>
        {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select
        className="p-2 border w-full"
        value={bowler}
        onChange={(e) => setBowler(e.target.value)}
      >
        <option>Select Bowler</option>
        {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
    </div>
  );
}
