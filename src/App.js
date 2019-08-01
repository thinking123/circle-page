import React from 'react';
import logo from './logo.svg';
import './App.css';

function mydec(cls) {
    console.log('cls' , cls)
}

@mydec
class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["init item"],
            tit: "title"
        }
    }

    ref = (ref) => {
        alert("ref ")
        this.rf = ref;
        console.log('ref', ref)
    }

    // ƒ(t) {
    //     var e, n = 0.call(arguments, 1);
    //     return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
    //         d(t, n, e)
    //     }), t
    // }

    click() {

        // this.setState({tit:this.state.items.length})
        this.state.items = [...this.state.items, "ne items"]
    }

    render() {
        return <div>
            <div>
                <button onClick={e => this.click()}>click</button>
            </div>
            <div>{this.state.tit}</div>
            {
                this.state.items.map(item => {
                    return <div>this is itme {item}</div>
                })
            }
        </div>
    }
}

function App() {
    return (
        <div className="App">
            <div>
                <MyPage/>
            </div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
