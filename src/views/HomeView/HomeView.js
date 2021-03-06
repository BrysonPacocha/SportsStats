/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'
import Rink from './icerink.jpg'
import classes from './HomeView.scss'
import Bench from '../../components/Bench/Bench'
import Events from '../../components/Events/Events'


// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };


  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.Rink}
              src={Rink}
              alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1>Welcome to Sports Stats</h1>
        <h2> Player Database</h2>
        <form>
          <input type="text" placeholder="Enter player name" required/><br/>
          <input type="text" placeholder="Player Number" required/><br/>
          <label><input type="radio" name="position"/> Forward</label><br/>
          <label><input type="radio" name="position"/> Defensemen</label><br/>
          <label><input type="radio" name="position"/> Goalie</label><br/>
          <button type="Submit">Submit</button>
        </form>
        <Bench
        team={this.props.game.home}
        which="home"
        />
        <Bench
        team={this.props.game.away}
        which="away"
        />
        <Events
        game={this.props.game}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  game: state.game
})
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(HomeView)
