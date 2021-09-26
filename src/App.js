import logo from "./logo.svg";
import "./App.css";
import react, { Component } from "react";
import { interval } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

class App extends Component {
  state = {
    profiles: [],
    isLoading: false,
  };
  /*async fetchData() {
    this.setState({ isLoading: true });
    const res = await fetch("http://localhost:3000/profiles");
    const data = await res.json();
    this.setState({ profiles: data, isLoading: false });
  }
  async componentDidMount() {
    await this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 1000);
  }
  componentWillUnmount(){
    clearInterval(interval)
  }*/
  async componentDidMount() {
    this.setState({ isLoading: true });
    const request = interval(1000).pipe(
      startWith(0),
      switchMap(async () =>
        fetch("http://localhost:3000/profiles").then((res) => res.json())
      )
    );
    request.subscribe((data) => {
      this.setState({ profiles: data, isLoading: false });
    });
  }
  render() {
    const { profiles, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading..</p>;
    }
    return (
      <div>
        {profiles.map((data) => {
          return <p>{data.email}</p>;
        })}
      </div>
    );
  }
}
export default App;
