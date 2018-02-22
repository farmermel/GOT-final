import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import HouseCard from '../HouseCard/HouseCard';
import { connect } from 'react-redux';
import { setHouseData } from '../../actions';
import { firstApiCall, getSwornMembers } from '../../helpers/apiCalls';
import wolfGif from '../../wolf.gif';

export class App extends Component {
  componentDidMount = async () => {
    const { setHouseData } = this.props;
    try {
      const initialData = await firstApiCall();
      const cleanData = this.cleanHouseData(initialData);
      setHouseData(cleanData);
    } catch (error) {
      console.log(error);
    }
  }

  cleanHouseData = houseData => {
    return houseData.map(async house => {
      const swornMembers = await getSwornMembers(house.swornMembers);
      console.log(swornMembers)
      house.ancestralWeapons = house.ancestralWeapons.join(', ') || 'none';
      house.seats = house.seats.join(', ') || 'none';
      house.titles = house.titles.join(', ') || 'none';
      return house;
    });
  }

  displayHouses = houseData => {
    return houseData.map( (house, index) => {
      return (
        <HouseCard card={house} key={index} />
      );
    });
  }

  render() {
    const { houseData } = this.props;
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Westeros</h2>

        </div>
        <div className='Display-info'>
          {
            houseData.length 
              ? this.displayHouses(houseData)
              : <div><img src={wolfGif} alt='loading' /></div>
          }
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
