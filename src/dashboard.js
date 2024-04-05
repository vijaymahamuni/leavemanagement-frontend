import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./dashboard.css";
import counterReducer from './Counter';
import RootReducer from './rootReducer';

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);

  function handleIncrement() {
    dispatch({ type: 'INCREMENT' });
  }

  function handleDecrement() {
    dispatch({ type: 'DECREMENT' });
  }
function handleReset(){
  dispatch({type:'RESET'})
}
  return (
    <div className='dashstl'>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>

    </div>
  );
}

export default Counter;
