# game-of-life
A simple implementation of Conway's Game of Life, built using Test-Driven Development. The project focuses on creating and evolving cell grids with various initial patterns and rules.

## Rules
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.