import React, { useState } from 'react';
import Navbar from '../components/navbar';
import PlanForm from '../components/planform';
import ActivityForm from '../components/activityform';

export default function Home(props) {
  const [isSecondary, setIsSecondary] = useState(false);
  return (
    <>
    <Navbar />
    {/* <PlanForm /> */}
    {/* <ActivityForm /> */}
    { isSecondary ? <ActivityForm /> : <PlanForm updateState={setIsSecondary}/>}
    </>
  );
}
