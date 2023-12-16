/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader';
import MetaTags from '../../components/meta-tags';
import { mapEmployeesData } from '../../data/employeesData';
import { sendErrorNotification } from '../../services/notifications';
import { getAllEmployees } from '../../services/employees/allEmployees';
import MainSection from './main-section';
import AddEmployee from './addEmployee';
import './styles.scss';

const Employees = () => {
  const navigate = useNavigate();
  const [{metaData, mainSection}, setEmployeesData] = useState(mapEmployeesData([]));
  const [isLoading, setIsLoading] = useState(false);
  const employee = useSelector(state => state.employee.loggedInEmployee);
  const isUpdateOperation = employee?.role?.toLowerCase() === 'admin';
  useEffect( ()=>{
    const fetchEmployees = async ()=>{
      setIsLoading(true);
      const response = await getAllEmployees();
      if(response.status === 'TokenExpiredError'){
        navigate('/login');
        sendErrorNotification('Session expired login again!')
      }
      setEmployeesData(mapEmployeesData(response.body.data));
      setIsLoading(false);
    }
    fetchEmployees();
    console.log('mainSection:-',mainSection)
  },[])
  
  return ( isLoading ? <Loader/> :
    <div className='employees-page'>
      <div className="employees-container">
        <MetaTags {...metaData}/>
        <MainSection {...mainSection}/>
        {isUpdateOperation ? <AddEmployee /> : null}

      </div>
    </div>
  )
}

export default Employees