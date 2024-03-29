import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingList from './ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';

// Below is called as controlled component
class Square1 extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }*/

    render() {
        return (
            <button className="square" /*onClick={() => { alert('click'); }}*/ onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

// Below is called as function component
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }*/

    /*handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // squares[i] = 'X';
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
    }*/

    renderSquare(i) {
        // return <Square value={i} />;
        // return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
        return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />);
    }

    render() {
        /*const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }*/

        // const status = 'Next player: X';
        // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                {/*<div className="status">{status}</div>*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    // render() {
    //     return (
    //         <div className="game">
    //             <div className="game-board">
    //                 <Board />
    //             </div>
    //             <div className="game-info">
    //                 <div>{/* status */}</div>
    //                 <ol>{/* TODO */}</ol>
    //             </div>
    //         </div>
    //     );
    // }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        // const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key="{move}">
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

ReactDOM.render(<ShoppingList name="Ramesh" />, document.getElementById('root1'));


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// on click can be written below ways...

class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}

class LoggingButton1 extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button onClick={() => this.handleClick()}>
                Click me
            </button>
        );
    }
}