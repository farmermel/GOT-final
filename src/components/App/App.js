import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setHouseData } from '../../actions';
import { firstApiCall } from '../../helpers/apiCalls';
import wolfGif from '../../wolf.gif';

export class App extends Component {
  componentDidMount = async () => {
  const { setHouseData } = this.props;
    try {
      const initialData = await firstApiCall();
      setHouseData(initialData)
    } catch (error) {
      console.log(error)
    }
  }

  // getHouses = async () => {

  // }

  cleanHouseData = houseData => {
    const cleanHouseData = {...houseData};
    cleanHouseData.ancestralWeapons = houseData.ancestralWeapons.join(', ');
    cleanHouseData.seats = houseData.seats.join(', ');
    cleanHouseData.titles = houseData.titles.join(', ');
    return cleanHouseData;
  }

  displayHouses = houseData => {
    return houseData.map( (house, i) => {
      const cleanHouse = this.cleanHouseData(house)
      console.log(cleanHouse)
      return (
        <div key={i}>
          <h1>Name: {cleanHouse.name}</h1>
          <p>founded: {cleanHouse.founded}</p>
          <p>seats: {cleanHouse.seats}</p>
          <p>titles: {cleanHouse.titles}</p>
          <p>coat of arms: {cleanHouse.coatOfArms}</p>
          <p>ancestral weapons: {cleanHouse.ancestralWeapons}</p>
          <p>words: {cleanHouse.words}</p>
        </div>
      )
    })
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
