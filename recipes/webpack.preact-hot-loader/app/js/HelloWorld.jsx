import {h, Component} from 'preact';

export default class HelloWorld extends Component {
  render() {
    // Play with it...
    const name = 'Shane';

    return (
      <h2 className="hello-world">
        <span className="hello-world__i">Hello, {name}</span>
      </h2>
    );
  }
}
