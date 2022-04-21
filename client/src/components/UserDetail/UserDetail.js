import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

function UserDetail() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [key, setKey] = useState('home');
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
    >
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className='mb-3'
      >
        <Tab eventKey='home' title='Home'>
          {/* <h1>{user.username}</h1> */}
        </Tab>

        <Tab eventKey='profile' title='Profile'></Tab>
        <Tab eventKey='contact' title='Contact' disabled></Tab>
      </Tabs>
    </div>
  );
}

export default UserDetail;
