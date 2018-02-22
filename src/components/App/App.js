import React, { Component } from 'react';
import PropTypes, { shape, func, string } from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setHouseData } from '../../actions';
import { firstApiCall } from '../../helpers/apiCalls';

class App extends Component {
  // componentDidMount = async () => {
  //   try {
  //     const initialData = await firstApiCall();
  //     setHouseData(initialData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  getHouses = async () => {
    const { setHouseData } = this.props;
    try {
      const initialData = await firstApiCall();
      setHouseData(initialData)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Westeros</h2>
          <button onClick={() => {
            this.getHouses();
            // alert(this.props.fake);
          }}> Get Houses</button>
        </div>
        <div className='Display-info'>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fake: shape({ fake: string }),
  setHouseData: func.isRequired
};

const mapStateToProps = ({ houseData }) => ({
 houseData 
});
const mapDispatchToProps = dispatch => ({ 
  setHouseData: houseData => dispatch(setHouseData(houseData))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
