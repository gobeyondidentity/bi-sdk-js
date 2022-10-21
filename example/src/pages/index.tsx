import Layout from "../components/layout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.css";

import Login from '../components/login';
import GetCredentials from "../components/get-credentials";
import BindCredential from "../components/bind-credential";
import RecoverCredential from "../components/recover-credential";

export default function IndexPage() {
  const [key, setKey] = useState('home');
  console.log(key);
  return (
    <Layout>
      <main className="flex-shrink-0 mb-5">
        <Tabs
            id="tab"
            className="mb-3 justify-content-center"
          >
            <Tab eventKey="signup" title="1. Signup">
                <BindCredential></BindCredential>
                <GetCredentials></GetCredentials>
            </Tab>
            <Tab eventKey="list" title="2. Manage Local Passkeys">
               <GetCredentials></GetCredentials>
            </Tab>
            <Tab eventKey="signin" title="3. Sign in with Passkey">
              <Login></Login>
            </Tab>
            <Tab eventKey="recover" title="4. Existing User">
              <RecoverCredential></RecoverCredential>
            </Tab>
        </Tabs>
      </main>
    </Layout>
  )
}
