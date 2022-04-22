import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getSession } from '../../API';

function UserDetail() {
  const [key, setKey] = useState('home');
  const [user, setUser] = useState({});

  useEffect(() => {
    getSession().then((myData) => setUser(myData));
  }, []);

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
          <h1>Placeholder: {user.username}</h1>
        </Tab>

        <Tab eventKey='profile' title='Profile'></Tab>
        <Tab eventKey='contact' title='Contact' disabled></Tab>
      </Tabs>
    </div>
  );
}

export default UserDetail;
