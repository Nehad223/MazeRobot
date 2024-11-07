import React, { useState, useEffect } from 'react';
import './App.css';

const RobotMaze = () => {
  const [position, setPosition] = useState({ x: 1, y: 2 });
  const [isReturn, setIsreturn] = useState(false)
  const maze = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', '', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', '#', '#', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'E'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];

  const bfs = (start, end) => {
    const queue = [[start]];
    const visited = new Set();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const path = queue.shift();
      const { x, y } = path[path.length - 1];

      if (x === end.x && y === end.y) return path;

      const directions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
      ];

      for (const direction of directions) {
        if (
          direction.x >= 0 &&
          direction.x < maze[0].length &&
          direction.y >= 0 &&
          direction.y < maze.length &&
          maze[direction.y][direction.x] !== '#' &&
          !visited.has(`${direction.x},${direction.y}`)
        ) {
          visited.add(`${direction.x},${direction.y}`);
          queue.push([...path, direction]);
        }
      }
    }
    return null;
  };

  const moveAutomatically = () => {
    const path = bfs(position, { x: 18, y: 7 });
    if (path) {
      for (let i = 1; i < path.length; i++) {
        setTimeout(() => {
          setPosition(path[i]);
        }, i * 500);
      }
    }
  };




  return (
    <div className="maze-container">
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, cellIndex) => {
              const isRobot = position.x === cellIndex && position.y === rowIndex;
              return (
                <div
                  key={cellIndex}
                  className={`maze-cell ${isRobot ? 'robot' : cell === '#' ? 'wall' : ''}`}
                >
                  {isRobot ? '🤖' : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={moveAutomatically}>Find path</button>
    </div>
  );
};

export default RobotMaze;