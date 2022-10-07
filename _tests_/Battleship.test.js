import { Battleship } from '../src/Battleship.js';

test('return ship length of 4', () => {
    let ship = Battleship(4);
    // console.log(ship);
    expect(ship.shipData.length).toBe(4);
})

test('return # of times hit = 3', () => {
    let ship = Battleship(4, 3);
    expect(ship.shipData.hits).toBe(3);
})

test('return true for being sunk', () => {
    let ship = Battleship(4, 3, true);
    expect(ship.shipData.sunk).toBeTruthy();
})

test('return hits = 3, after +1', () => {
    let ship = Battleship(4, 2);
    expect(ship.hit()).toBe(3);
})

test('returns true for isSunk', () => {
    // Initialize ship with equal hits and lenght
    let ship = Battleship(4, 4);
    expect(ship.isSunk()).toBeTruthy();
})

let ship = {
    length: 4,
    hits: 2,
    sunk: false
}