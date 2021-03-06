import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firstApiCall, getSwornMembers } from '../../helpers/apiCalls';
import { setHouseData } from '../../actions';
import HouseCard from '../HouseCard/HouseCard';
import logo from './logo.svg';
import wolfGif from '../../wolf.gif';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  componentDidMount = async () => {
    const { setHouseData } = this.props;
    try {
      const initialData = await firstApiCall();
      const cleanData = await this.cleanHouseData(initialData);
      const usableData = await Promise.all(cleanData);
      setHouseData(usableData);
    } catch (error) {
      this.setState({ error });
    }
  }

  cleanHouseData = async houseData => {
    try {
      const houseDupe = [...houseData];
      return await houseDupe.map(async (house, index) => {
        const cleanSwornMembers = await getSwornMembers(house.swornMembers);
        house.ancestralWeapons = house.ancestralWeapons.join(', ') || 'none';
        house.seats = house.seats.join(', ') || 'none';
        house.titles = house.titles.join(', ') || 'none';
        house.swornMembers = cleanSwornMembers;
        house.id = index;
        return house;
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  displayHouses = houseData => {
    return houseData.map( (house) => {
      return (
        <HouseCard card={house} key={house.id} clicked={false} />
      );
    });
  }

  render() {
    const { houseData } = this.props;
    return (
      <div className='App'>
        {
          this.state.error && <h3>Oops, something went wrong!</h3>
        }
        <Link to={{pathname: '/'}}>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h2>Welcome to Westeros</h2>

          </div>
        </Link>
        <div className='Display-info'>
          <Switch>
            <Route exact path='/' render={() => (
              houseData.length 
                ? this.displayHouses(houseData)
                : <div><img src={wolfGif} alt='loading' /></div>
            )} />
            <Route path='/house/:id' render={({ match }) => {
              const houseRender = houseData.find( house => {
                return house.id === parseInt(match.params.id, 10);
              });
              return houseData.length
                ? <HouseCard card={houseRender} clicked={true} />
                : <div><img src={wolfGif} alt='loading' /></div>;
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  houseData: PropTypes.arrayOf(PropTypes.object),
  setHouseData: PropTypes.func.isRequired
};

export const mapStateToProps = ({ houseData }) => ({
  houseData 
});
export const mapDispatchToProps = dispatch => ({ 
  setHouseData: houseData => dispatch(setHouseData(houseData))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
