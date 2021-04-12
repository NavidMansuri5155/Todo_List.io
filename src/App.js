import React from 'react';
import './App.css';
import FlipMove from "react-flip-move";


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [  ],
      currentIteam: {
        text: "",
        key: " "
      }
    }

    this.handleInput = this.handleInput.bind(this)
    this.AddIteam = this.AddIteam.bind(this)
    this.DeleteItems = this.DeleteItems.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
  }

  handleInput(e) {
    this.setState({
      currentIteam: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  AddIteam(e) {
    e.preventDefault();
    const newiteam = this.state.currentIteam;
    console.log(newiteam);
    if (newiteam !== "") {
      const newIteams = [...this.state.items, newiteam];
      this.setState({
        items: newIteams,
        currentIteam: {
          text: "",
          key: "",
        }
      })
    }
  }

  DeleteItems(key) {
    const fliterItems = this.state.items.filter(second => second.key !== key);
    console.log(fliterItems);
    this.setState({ items: fliterItems })
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        item.text = text;
      }
    });

    this.setState({
      items: items
    })
  }

  render() {
    return (

      <div className="first-todo">
        <div className="second-input">
          <header >
            <h1 style={{ textAlign: "center" }}>
              TODO LIST
          </h1>
            <div className="col-6" >
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    <h2>✎</h2>
                  </span>
                </div>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" cols="2" type="text" placeholder="Enter your text" value={this.state.currentIteam.text} onChange={this.handleInput}></textarea>
              </div>
            </div>
            <button type="button" className="btn btn-primary" variant="contained" color="secondary" onClick={this.AddIteam} style={{ height: 50, margin: "3% 20%" }}>Note your text</button>
          </header>
          <Listiteams items={this.state.items} DeleteItems={this.DeleteItems} setUpdate={this.setUpdate} />
        </div>
      </div>
    )
  }
}



function Listiteams(props) {
  const items = props.items;
  const listData = items.map(one => {
    return <div key={one.key}>
      <p style={{ boxShadow: "2px" }}>
        <div className="container">
          <input type="text"
            className="form-control"
            placeholder="here you can edit also"
            id={one.key} value={one.text}
            onChange={(e) => { props.setUpdate(e.target.value, one.key) }}
            style={{ fontSize: "20px" }} />
        </div>

        <button style={{ margin: "-3% 2% 1.5% 86%" }} className="input-group-prepend" type="button" className="btn btn-primary" fontSize="large" onClick={() => { props.DeleteItems(one.key) }} >DELETE</button>
      </p>
    </div>
  })
  return (<div>
    <FlipMove duration={700} easing="ease-in-out">
      {listData}
    </FlipMove>
  </div>)
}

export default App;
