import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import UserCard from '../UserCard/UserCard';

function UserDetail() {
  const [key, setKey] = useState('home');

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='mb-3'
        >
          <Tab eventKey='home' title='Home'></Tab>

          <Tab eventKey='profile' title='Profile'></Tab>
          <Tab eventKey='contact' title='Contact' disabled></Tab>
        </Tabs>
      </div>
      {key === 'profile' ? (
        <div>
          <UserCard />
        </div>
      ) : null}
    </>
  );
}

export default UserDetail;
