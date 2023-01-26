
import React from 'react'

import './reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/rooms/${hotelId}`);
  console.log(data)
  return (
    <div className='reserve'>
        <div className='rContainer'>
        <FontAwesomeIcon icon={faCircleXmark} className="rClose"
        onClick={() => setOpen(false)}/>
        <span>Select your rooms: </span>
        {data &&
          data.map((item) => {
            <div className='rItem'>
              <div className='rItemInfo'>
                <div className='rTitle'> {item.title} </div>
                <div className='rDescription'>{item.description}</div>
                <div className='rMax'>Maximum People :  <b>{item.maxPeople}</b></div>
              </div>
            </div>
          })
        }
        </div>
    </div>
  )
}

export default Reserve