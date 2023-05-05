import { Button } from '@material-ui/core'
import React ,{useEffect}from 'react'
import {useTranslation}from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { fetchInforUser } from '../../redux/reducer'
import { useAppDispatch ,RootState} from '../../redux/store'
import { useSelector } from "react-redux";
const Header = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchInforUser(document.cookie.split("=")[1]));
    }, [dispatch]);
  
    const user = useSelector(
      (state: RootState) => state.InforUser
    );
    
  return (
    <div style={{position:"fixed"}}>
        <Button >
            <NavLink to={"/table" } > Table</NavLink>
        </Button>
        <Button >
            <NavLink to={"/profile" } style={{display:'flex'}}>
                <div style={{marginTop:13,marginRight:5}}>{user.name}</div>
            <img src={user.avatar ? `http://api.training.div3.pgtest.co/${user.avatar}`: ''} style={{width:50,height:50,borderRadius:90}}  alt="" />
            </NavLink>
        </Button>
       
    </div>
  )
}

export default Header