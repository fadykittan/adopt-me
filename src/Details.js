import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel"; //eslint-disable-line
import ErrorBoundary from "./ErrorBoundary"; //eslint-disable-line
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

// const Details = () => {
//   return <h2>hi lololol omg wtf!</h2>;
// };

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount() {
    //console.log(this.props.match);
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    // console.log(res);
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    // console.log(this.state);
    const { animal, name, breed, city, state, description, images, showModal } =
      this.state;

    // var hero = "http://pets-images.dev-apis.com/pets/none.jpg";
    // if (images) {
    //   hero = images[0];
    // }

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>

          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {/* <img src={hero} alt={name} /> */}
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name} ?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
