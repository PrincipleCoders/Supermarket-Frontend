import React from 'react';
import '../styles/404.scss';

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0,
    };
  }

  handleMouseMove = (event) => {
    const pageX = document.documentElement.clientWidth;
    const pageY = document.documentElement.clientHeight;
    const mouseY = event.pageY;
    const mouseX = event.pageX / -pageX;

    const yAxis = (pageY / 2 - mouseY) / pageY * 300;
    const xAxis = -mouseX * 100 - 100;

    this.setState({ mouseX, mouseX });

    const ghostEyes = document.querySelector('.box__ghost-eyes');
    ghostEyes.style.transform = `translate(${xAxis}%, -${yAxis}%)`;
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    return (
      <div className="box">
        <div className="box__ghost">
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>

          <div className="box__ghost-container">
            <div className="box__ghost-eyes">
              <div className="box__eye-left"></div>
              <div className="box__eye-right"></div>
            </div>
            <div className="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="box__ghost-shadow"></div>
        </div>

        <div className="box__description">
          <div className="box__description-container">
            <div className="box__description-title">Whoops!</div>
            <div className="box__description-text">
              It seems like we couldn't find the page you were looking for
            </div>
          </div>

          <a href="/"  className="box__button">
            Go back
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
