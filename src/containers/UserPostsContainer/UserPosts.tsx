import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import axios from 'axios';
import { UserPostsItemsInterfaces, ParamTypes, UserPostsProps, PostsState } from "../../types/interfaces";
import { addNewPost, setPostsList } from "../../actions/actions";
import AddIcon from '../../assets/images/add-icon.svg';
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { api } from "../../constants/api";

import '../../styles/styles.css'

const UserPosts = ({ posts, setPostsList, addNewPost }: UserPostsProps ) =>{
    let { id }  = useParams< ParamTypes >();
    const [ toggleModal, toggleModalSet ] = useState< boolean >( false )
    const [isLoading, setIsLoading] = useState< boolean >( true )
    const history = useHistory();

    const postNavigator = ( id: number ) => history.push(`/post/${ id }`);

    useEffect(()=>{
        const loadPosts = async () =>{
            try {
                const response = await axios.get(`${ api }posts?userId=${ id }`)
                const posts = await response.data
                setPostsList( posts )
                setIsLoading(false)
            }
            catch (e) {
                console.log(e)
            }
        }
        loadPosts()
    },[ setPostsList, id ])

    const addPost = async ( title: string, body: string ) =>{
        try{
            const response = await axios.post(`${ api }posts`,{
                title: title,
                body: body,
                userId: 11
            })
            const data = await response.data
            addNewPost( data )
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleModalChange = () =>{
        toggleModalSet( !toggleModal )
    }

    return(
        <div className='page-container'>
            <div className='page-wrapper'>
                <span className='page-title'> Posts </span>
                {
                    isLoading ?
                        <LoadingCircle/>
                        :
                        <>
                            <table className='page-table'>
                                <thead>
                                <tr>
                                    <th className='item-container'> Title </th>
                                    <th className='item-container'> Body </th>
                                </tr>
                                </thead>
                                <tbody className='page-table-body'>
                                {posts.map(( { id, title, body }: UserPostsItemsInterfaces ) => {
                                        return (
                                            <tr key={ id }>
                                                <td className='item-container'> { title } </td>
                                                <td className='item-container'> { body } </td>
                                                <td>
                                                    <button onClick={() => postNavigator( id )}> Details </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                                </tbody>
                            </table>
                            <div onClick={ handleModalChange }>
                                <img src={ AddIcon } className='add-icon' alt='add-post'/>
                            </div>
                        </>
                }
            </div>
            {
                toggleModal &&
                    <ModalWindow
                        handleModalClose={ handleModalChange }
                        submitForm={ addPost }
                        id={ '' }
                        title={ '' }
                        body={ '' }
                    />
            }
        </div>
    )
}

const mapDispatchToProps = ( dispatch: Dispatch ) => bindActionCreators({
    setPostsList, addNewPost
}, dispatch);
const mapStateToProps = ( state: PostsState ) =>({
    posts: state.postsReducer.postsList
})

export default connect( mapStateToProps, mapDispatchToProps )( UserPosts )