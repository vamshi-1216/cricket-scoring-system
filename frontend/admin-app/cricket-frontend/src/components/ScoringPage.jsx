import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

const mapExtraType = (type) => {
  if (!type) return null;
  switch (type) {
    case "WIDE": return "WD";
    case "NO_BALL": return "NB";
    case "BYE": return "BYE";
    case "LEG_BYE": return "LB";
    default: return type;
  }
};

export default function ScoringPage() {
  const { matchId } = useParams();

  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState({});
  const [battingTeamId, setBattingTeamId] = useState(null);
  const [bowlingTeamId, setBowlingTeamId] = useState(null);
  const [battingPlayers, setBattingPlayers] = useState([]);
  const [bowlingPlayers, setBowlingPlayers] = useState([]);

  const [innings, setInnings] = useState(1);
  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [bowler, setBowler] = useState(null);

  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);

  const [battingStats, setBattingStats] = useState({});
  const [bowlingStats, setBowlingStats] = useState({});
  const [commentary, setCommentary] = useState([]);

  const [target, setTarget] = useState(null);
  const [matchCompleted, setMatchCompleted] = useState(false);
  const [winnerTeamName, setWinnerTeamName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalBalls = match?.overs ? match.overs * 6 : 0;

  useEffect(() => {
    async function loadData() {
      try {
        const [matchRes, teamsRes] = await Promise.all([
          axios.get(`/matches/${matchId}`),
          axios.get("/teams/all"),
        ]);

        const matchData = matchRes.data;
        setMatch(matchData);
        setTarget(matchData.targetScore || null);

        const teamMap = {};
        teamsRes.data.forEach((t) => (teamMap[t.id] = t));
        setTeams(teamMap);

        const { teamAId, teamBId, tossWinnerTeamId, tossDecision } = matchData;

        let firstBattingId =
          tossWinnerTeamId === teamAId
            ? tossDecision === "BAT"
              ? teamAId
              : teamBId
            : tossDecision === "BAT"
            ? teamBId
            : teamAId;

        const firstBowlingId = firstBattingId === teamAId ? teamBId : teamAId;

        setBattingTeamId(firstBattingId);
        setBowlingTeamId(firstBowlingId);

        const [batRes, bowlRes] = await Promise.all([
          axios.get(`/players/team/${firstBattingId}`),
          axios.get(`/players/team/${firstBowlingId}`),
        ]);

        setBattingPlayers(batRes.data);
        setBowlingPlayers(bowlRes.data);
      } catch (e) {
        setError("Failed to load scoring data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [matchId]);

  const oversStr = `${Math.floor(balls / 6)}.${balls % 6}`;
  const crr = balls > 0 ? ((runs * 6) / balls).toFixed(2) : "0.00";

  const runsNeeded = innings === 2 && target ? target - runs : null;
  const ballsRemaining = innings === 2 && totalBalls ? totalBalls - balls : null;
  const firstInningsScore = target != null ? target - 1 : null;

  useEffect(() => {
    if (
      innings === 1 &&
      totalBalls > 0 &&
      (balls >= totalBalls || wickets >= 10)
    ) {
      handleEndInnings();
    }
  }, [balls, wickets, innings, totalBalls]);

  useEffect(() => {
    if (matchCompleted) return;
    if (innings !== 2 || target == null) return;

    if (runs >= target) {
      endMatch(battingTeamId);
      return;
    }

    if ((totalBalls > 0 && balls >= totalBalls) || wickets >= 10) {
      if (firstInningsScore == null) {
        endMatch(bowlingTeamId);
        return;
      }

      if (runs > firstInningsScore) {
        endMatch(battingTeamId);
      } else if (runs < firstInningsScore) {
        endMatch(bowlingTeamId);
      } else {
        endMatch(null);
      }
    }
  }, [
    runs,
    balls,
    wickets,
    innings,
    target,
    firstInningsScore,
    totalBalls,
    battingTeamId,
    bowlingTeamId,
    matchCompleted,
  ]);

  const endMatch = async (winningTeamId) => {
    if (matchCompleted) return;

    setMatchCompleted(true);

    let status = "COMPLETED";
    let winnerName = winningTeamId
      ? teams[winningTeamId]?.name || "Unknown"
      : "Match Tied";

    setWinnerTeamName(winnerName);

    try {
      await axios.put(`/matches/${matchId}`, {
        ...match,
        status,
        winnerTeamId: winningTeamId || null,
      });
    } catch (err) {}

    addCommentary(
      winningTeamId
        ? `🏁 Match Ended! Winner: ${winnerName} 🎉`
        : "🏁 Match Ended! Match Tied 🤝"
    );
  };

  const addCommentary = (text) => {
    setCommentary((prev) => [
      {
        id: Date.now() + Math.random(),
        over: Math.floor(balls / 6),
        ball: balls % 6 === 0 ? 6 : balls % 6,
        text,
      },
      ...prev,
    ]);
  };

  const updateBattingStats = (batsmanId, runsScored) => {
    setBattingStats((prev) => {
      const prevStats = prev[batsmanId] || {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      };
      const newStats = { ...prevStats };
      newStats.runs += runsScored;
      newStats.balls += 1;
      if (runsScored === 4) newStats.fours += 1;
      if (runsScored === 6) newStats.sixes += 1;
      return { ...prev, [batsmanId]: newStats };
    });
  };

  const updateBowlingStats = (
    bowlerId,
    runsConceded,
    isWicket,
    isLegalDelivery = true
  ) => {
    setBowlingStats((prev) => {
      const prevStats = prev[bowlerId] || {
        balls: 0,
        runs: 0,
        wickets: 0,
      };
      const newStats = { ...prevStats };
      if (isLegalDelivery) newStats.balls += 1;
      newStats.runs += runsConceded;
      if (isWicket) newStats.wickets += 1;
      return { ...prev, [bowlerId]: newStats };
    });
  };

  const handleBall = async ({
    runsBatsman = 0,
    runsExtras = 0,
    extraType = null,
    wicket = false,
    wicketType = null,
  }) => {
    if (!striker || !nonStriker || !bowler) {
      alert("Select striker, non-striker, and bowler first!");
      return;
    }

    const isWide = extraType === "WIDE";
    const isNoBall = extraType === "NO_BALL";
    const isLegalDelivery = !isWide && !isNoBall;

    const thisBallRuns = runsBatsman + runsExtras;

    try {
      const over = Math.floor(balls / 6);
      const ballInOver = (balls % 6) + 1;

      await axios.post("/api/stats/ball", {
        eventId: `${matchId}-${innings}-${over}-${ballInOver}-${Date.now()}`,
        matchId: Number(matchId),
        innings: Number(innings),
        over: Number(over),
        ballInOver: Number(ballInOver),
        batterId: striker.id,
        nonStrikerId: nonStriker.id,
        bowlerId: bowler.id,
        battingTeamId: Number(battingTeamId),
        runsBatsman,
        runsExtras,
        extraType: mapExtraType(extraType),
        wicket,
        wicketType,
        wicketPlayerId: wicket ? striker.id : null,
        totalRunsThisBall: thisBallRuns,
        timestamp: new Date().toISOString(),
        source: "WEB_UI_V1",
        idempotencyKey: `${matchId}-inn${innings}-over${over}-ball${ballInOver}`,
      });
    } catch (err) {}

    let newBalls = balls;
    if (isLegalDelivery) newBalls = balls + 1;

    if (isLegalDelivery) setBalls(newBalls);
    setRuns((prev) => prev + thisBallRuns);

    if (isLegalDelivery) updateBattingStats(striker.id, runsBatsman);

    updateBowlingStats(bowler.id, thisBallRuns, wicket, isLegalDelivery);

    if (wicket) setWickets((prev) => prev + 1);

    if (!wicket && isLegalDelivery && thisBallRuns % 2 === 1) {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }

    if (isLegalDelivery && newBalls % 6 === 0 && newBalls > 0) {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
      setBowler(null);
      addCommentary("🛑 End of over");
    }

    let text = `${striker?.name} vs ${bowler?.name}: `;
    if (wicket) text += `OUT! (${wicketType || "WICKET"})`;
    else if (extraType) text += `${extraType} +${thisBallRuns}`;
    else if (runsBatsman === 0) text += "Dot ball.";
    else text += `${runsBatsman} run(s).`;

    addCommentary(text);
  };

  const handleWicket = () => {
    handleBall({
      runsBatsman: 0,
      runsExtras: 0,
      wicket: true,
      wicketType: "WICKET",
    });
    setTimeout(() => {
      alert("Select new batsman");
      setStriker(null);
    }, 200);
  };

  const handleEndInnings = async () => {
    if (!window.confirm("End this innings and start next?")) return;
    if (innings !== 1) return;

    const newTarget = runs + 1;
    setTarget(newTarget);

    try {
      await axios.put(`/matches/${matchId}`, {
        ...match,
        targetScore: newTarget,
        status: "IN_PROGRESS",
      });
    } catch (err) {}

    const newBattingId = bowlingTeamId;
    const newBowlingId = battingTeamId;

    setBattingTeamId(newBattingId);
    setBowlingTeamId(newBowlingId);
    setInnings(2);
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setBattingStats({});
    setBowlingStats({});
    setStriker(null);
    setNonStriker(null);
    setBowler(null);

    try {
      const [batRes, bowlRes] = await Promise.all([
        axios.get(`/players/team/${newBattingId}`),
        axios.get(`/players/team/${newBowlingId}`),
      ]);
      setBattingPlayers(batRes.data);
      setBowlingPlayers(bowlRes.data);
    } catch (err) {}

    addCommentary(`🎯 TARGET SET: ${newTarget}`);
  };

  if (loading) return <p className="text-center text-yellow-300">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const battingTeam = teams[battingTeamId];
  const bowlingTeam = teams[bowlingTeamId];

  /* ---------------------------------------------------------
        GOT THEME MATCH COMPLETE SCREEN (UPDATED)
  --------------------------------------------------------- */
  if (matchCompleted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-['Cinzel'] text-[#e6c884]"
        style={{
          backgroundImage: "url('/stadium.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 bg-black/40 border border-yellow-700 p-10 rounded-2xl shadow-2xl backdrop-blur-md text-center max-w-xl">
          <h1 className="text-4xl font-bold tracking-widest mb-4">
            🏁 MATCH COMPLETED
          </h1>

          <p className="text-2xl font-semibold tracking-wide mb-4">
            {winnerTeamName === "Match Tied" ? (
              <span className="text-blue-300">🤝 MATCH TIED</span>
            ) : (
              <span className="text-yellow-400">
                🏆 Winner: {winnerTeamName}
              </span>
            )}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-yellow-700 text-black font-bold border border-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition tracking-widest"
          >
            VIEW SCORECARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-['Cinzel'] text-[#e6c884] px-4 py-6"
      style={{
        backgroundImage: "url('/stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        <CommentaryPanel commentary={commentary} />

        <MainScoringPanel
          innings={innings}
          battingTeam={battingTeam}
          match={match}
          runs={runs}
          wickets={wickets}
          oversStr={oversStr}
          crr={crr}
          target={target}
          runsNeeded={runsNeeded}
          ballsRemaining={ballsRemaining}
          striker={striker}
          nonStriker={nonStriker}
          bowler={bowler}
          battingPlayers={battingPlayers}
          bowlingPlayers={bowlingPlayers}
          setStriker={setStriker}
          setNonStriker={setNonStriker}
          setBowler={setBowler}
          handleBall={handleBall}
          handleWicket={handleWicket}
          handleEndInnings={handleEndInnings}
        />

        <StatsPanel
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
          battingPlayers={battingPlayers}
          bowlingPlayers={bowlingPlayers}
          battingStats={battingStats}
          bowlingStats={bowlingStats}
          striker={striker}
          nonStriker={nonStriker}
        />

      </div>
    </div>
  );
}


/* ------------------------ COMMENTARY ------------------------ */

function CommentaryPanel({ commentary }) {
  return (
    <div className="lg:col-span-1 bg-black/40 border border-yellow-700 p-4 rounded-xl shadow-xl backdrop-blur-md">
      <h3 className="text-2xl font-bold mb-3 tracking-wider">📣 Commentary</h3>

      <div className="max-h-[70vh] overflow-y-auto space-y-2 pr-2">
        {commentary.length === 0 ? (
          <p className="text-yellow-300/70">No commentary yet.</p>
        ) : (
          commentary.map((c) => (
            <div
              key={c.id}
              className="bg-black/40 border border-yellow-800 p-2 rounded-lg text-sm"
            >
              <span className="text-yellow-400 font-mono mr-2">
                {c.over}.{c.ball}
              </span>
              {c.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


/* ------------------------ MAIN SCORING PANEL ------------------------ */

function MainScoringPanel({
  innings,
  battingTeam,
  match,
  runs,
  wickets,
  oversStr,
  crr,
  target,
  runsNeeded,
  ballsRemaining,
  striker,
  nonStriker,
  bowler,
  battingPlayers,
  bowlingPlayers,
  setStriker,
  setNonStriker,
  setBowler,
  handleBall,
  handleWicket,
  handleEndInnings,
}) {
  return (
    <div className="lg:col-span-2 bg-black/40 border border-yellow-700 p-6 rounded-xl shadow-xl backdrop-blur-md">

      <h2 className="text-3xl text-center font-bold tracking-widest mb-4">
        Innings {innings} – {battingTeam?.name}
      </h2>

      <p className="text-center text-4xl font-bold mb-2 tracking-wider">
        {runs}/{wickets}
        <span className="text-xl ml-2">
          ({oversStr} overs • CRR {crr})
        </span>
      </p>

      {innings === 2 && target && (
        <p className="text-center text-lg text-red-400 mb-4">
          🎯 Need {runsNeeded} runs off {ballsRemaining} balls
        </p>
      )}

      <div className="bg-black/30 border border-yellow-800 p-4 rounded-lg mb-4">
        <p><strong className="text-yellow-400">Striker:</strong> {striker?.name || "Select"}</p>
        <p><strong className="text-yellow-400">Non-Striker:</strong> {nonStriker?.name || "Select"}</p>
        <p><strong className="text-yellow-400">Bowler:</strong> {bowler?.name || "Select"}</p>
      </div>

      {!striker && (
        <SelectionPanel
          title="Select Striker"
          players={battingPlayers}
          setPlayer={setStriker}
        />
      )}

      {striker && !nonStriker && (
        <SelectionPanel
          title="Select Non-Striker"
          players={battingPlayers.filter((p) => p.id !== striker.id)}
          setPlayer={setNonStriker}
        />
      )}

      {striker && nonStriker && !bowler && (
        <SelectionPanel
          title="Select Bowler"
          players={bowlingPlayers}
          setPlayer={setBowler}
        />
      )}

      {striker && nonStriker && bowler && (
        <>
          <RunButtons handleBall={handleBall} handleWicket={handleWicket} />

          {innings === 1 && (
            <button
              onClick={handleEndInnings}
              className="mt-4 px-5 py-3 bg-gray-700 border border-gray-500 rounded-lg
                        text-white tracking-widest hover:bg-gray-600 transition"
            >
              END INNINGS
            </button>
          )}
        </>
      )}
    </div>
  );
}


/* ------------------------ SELECTION ------------------------ */

function SelectionPanel({ players, setPlayer, title }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {players.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlayer(p)}
            className="px-4 py-2 bg-yellow-700 text-black font-bold border border-yellow-500 
                       rounded-lg shadow hover:bg-yellow-600 transition"
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}


/* ------------------------ RUN BUTTONS ------------------------ */

function RunButtons({ handleBall, handleWicket }) {
  return (
    <>
      <h3 className="font-semibold mt-3">Runs</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {[0, 1, 2, 3, 4, 6].map((r) => (
          <button
            key={r}
            onClick={() => handleBall({ runsBatsman: r })}
            className="px-4 py-2 bg-purple-700 text-white border border-purple-500 
                       rounded-lg shadow hover:bg-purple-600 transition"
          >
            {r}
          </button>
        ))}
      </div>

      <h3 className="font-semibold">Extras</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => handleBall({ runsExtras: 1, extraType: "WIDE" })}
          className="px-4 py-2 bg-orange-700 text-black font-bold border border-orange-500 
                       rounded-lg shadow hover:bg-orange-600 transition"
        >
          WD
        </button>
        <button
          onClick={() => handleBall({ runsExtras: 1, extraType: "NO_BALL" })}
          className="px-4 py-2 bg-orange-700 text-black font-bold border border-orange-500 
                       rounded-lg shadow hover:bg-orange-600 transition"
        >
          NB
        </button>
        <button
          onClick={() => handleBall({ runsExtras: 1, extraType: "BYE" })}
          className="px-4 py-2 bg-orange-700 text-black font-bold border border-orange-500 
                       rounded-lg shadow hover:bg-orange-600 transition"
        >
          BYE
        </button>
        <button
          onClick={() => handleBall({ runsExtras: 1, extraType: "LEG_BYE" })}
          className="px-4 py-2 bg-orange-700 text-black font-bold border border-orange-500 
                       rounded-lg shadow hover:bg-orange-600 transition"
        >
          LB
        </button>
      </div>

      <button
        onClick={handleWicket}
        className="px-4 py-2 bg-red-700 text-white border border-red-500 
                   rounded-lg shadow hover:bg-red-600 transition"
      >
        WICKET
      </button>
    </>
  );
}


/* ------------------------ STATS PANEL ------------------------ */

function StatsPanel({
  battingTeam,
  bowlingTeam,
  battingPlayers,
  bowlingPlayers,
  battingStats,
  bowlingStats,
  striker,
  nonStriker,
}) {
  return (
    <div className="lg:col-span-1 space-y-6">

      {/* Batting */}
      <div className="bg-black/40 border border-yellow-700 rounded-xl p-4 shadow-xl backdrop-blur-md">
        <h3 className="text-xl font-bold mb-2 tracking-widest">
          🏏 Batting – {battingTeam?.name}
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-yellow-700">
              <th className="text-left">Batter</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            {battingPlayers.map((p) => {
              const s = battingStats[p.id] || {
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
              };
              const sr = s.balls > 0 ? ((s.runs * 100) / s.balls).toFixed(1) : "-";
              return (
                <tr key={p.id} className="border-b border-yellow-800">
                  <td>
                    {p.name}
                    {striker?.id === p.id && " ✳"}
                    {nonStriker?.id === p.id && " ✴"}
                  </td>
                  <td className="text-center">{s.runs}</td>
                  <td className="text-center">{s.balls}</td>
                  <td className="text-center">{s.fours}</td>
                  <td className="text-center">{s.sixes}</td>
                  <td className="text-center">{sr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bowling */}
      <div className="bg-black/40 border border-yellow-700 rounded-xl p-4 shadow-xl backdrop-blur-md">
        <h3 className="text-xl font-bold mb-2 tracking-widest">
          🎯 Bowling – {bowlingTeam?.name}
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-yellow-700">
              <th className="text-left">Bowler</th>
              <th>O</th>
              <th>R</th>
              <th>W</th>
              <th>ECO</th>
            </tr>
          </thead>
          <tbody>
            {bowlingPlayers.map((p) => {
              const s = bowlingStats[p.id] || {
                balls: 0,
                runs: 0,
                wickets: 0,
              };
              const overs = `${Math.floor(s.balls / 6)}.${s.balls % 6}`;
              const eco = s.balls > 0 ? ((s.runs * 6) / s.balls).toFixed(1) : "-";
              return (
                <tr key={p.id} className="border-b border-yellow-800">
                  <td>{p.name}</td>
                  <td className="text-center">{overs}</td>
                  <td className="text-center">{s.runs}</td>
                  <td className="text-center">{s.wickets}</td>
                  <td className="text-center">{eco}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
