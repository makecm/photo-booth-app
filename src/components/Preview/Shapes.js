const Shapes = () => {
  function getRandomLength() {
    return Math.floor(Math.random() * 500 + 100);
  }
  function getRandomGap() {
    return Math.floor(Math.random() * 500 + 900);
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <svg
        className="svg-shapes"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="100 100 600 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 1].map((item) => (
          <circle
            key={item}
            r={Math.floor(Math.random() * 500) + 100}
            cx={Math.floor(Math.random() * 500)}
            cy={Math.floor(Math.random() * 500)}
            strokeWidth={Math.floor(Math.random() * 1000 + 75)}
            strokeDasharray={`${getRandomLength()} ${getRandomGap()}`}
          />
        ))}
      </svg>
      <svg style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="bggrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#EF6690' }} />
            <stop
              offset="100%"
              style={{ stopColor: '#FF9E90' }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Shapes;
