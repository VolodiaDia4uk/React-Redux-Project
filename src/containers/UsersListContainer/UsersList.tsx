import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import { UsersListItemsInterfaces, UsersListProps, UsersState } from "../../types/interfaces";
import { setUsersList } from "../../actions/actions";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { api } from "../../constants/api";

import '../../styles/styles.css'

const UsersList = ({ users, setUsersList }: UsersListProps ) =>{
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState< boolean >( true )

    const postsNavigation = ( id: number ) => history.push(`/posts/${ id }`);

    useEffect(()=>{
        const loadUsers = async () =>{
            try {
                const response = await axios.get(`${ api }users`)
                const users = await response.data;
                setUsersList( users )
            }
            catch (e) {
                console.log(e)
            }
        }
        loadUsers()
        setIsLoading( false )
    },[ setUsersList ])

    return(
        <div className='page-container'>
            <div className='page-wrapper'>
                <span className='page-title'> Users </span>
                {
                    isLoading ?
                        <LoadingCircle/>
                        :
                        <table className='page-table' >
                            <thead>
                            <tr>
                                <th className='item-container'> Name </th>
                                <th className='item-container'> Username </th>
                                <th className='item-container'> Email </th>
                            </tr>
                            </thead>
                            <tbody className='page-table-body'>
                            {users.map(( { id, name, username, email }: UsersListItemsInterfaces )=>{
                               return(
                                   <tr key={ id }>
                                   <td className='item-container'> { name } </td>
                                   <td className='item-container'> { username } </td>
                                   <td className='item-container'> { email } </td>
                                   <td >
                                       <button onClick={ ()=>postsNavigation( id ) }> Posts </button>
                                   </td>
                               </tr>
                               )}
                             )}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}
const mapDispatchToProps = ( dispatch: Dispatch ) => bindActionCreators({
    setUsersList
}, dispatch);
const mapStateToProps = (state: UsersState) =>({
    users: state.usersReducer.usersList
})
export default connect( mapStateToProps, mapDispatchToProps )( UsersList )