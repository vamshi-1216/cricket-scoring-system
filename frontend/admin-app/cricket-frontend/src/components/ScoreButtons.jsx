export default function ScoreButtons({ handleBallSubmit }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[0,1,2,3,4,6].map((run) => (
        <button
          key={run}
          onClick={() => handleBallSubmit(run)}
          className="p-3 bg-blue-500 text-white rounded"
        >
          {run}
        </button>
      ))}

      <button
        onClick={() => handleBallSubmit(0, 1, "WIDE")}
        className="p-3 bg-purple-500 text-white rounded"
      >
        WIDE
      </button>

      <button
        onClick={() => handleBallSubmit(0, 1, "NO_BALL")}
        className="p-3 bg-purple-600 text-white rounded"
      >
        NO BALL
      </button>

      <button
        onClick={() => handleBallSubmit(0, 1, "BYE")}
        className="p-3 bg-gray-600 text-white rounded"
      >
        BYE
      </button>

      <button
        onClick={() => handleBallSubmit(0, 1, "LEG_BYE")}
        className="p-3 bg-gray-700 text-white rounded"
      >
        LEG BYE
      </button>

      <button
        onClick={() => handleBallSubmit(0, 0, null, true)}
        className="p-3 bg-red-600 text-white rounded col-span-2"
      >
        WICKET
      </button>
    </div>
  );
}
