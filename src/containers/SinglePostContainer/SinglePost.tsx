import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import axios from 'axios';
import { deletePostById, editPostById, setCommentsList } from "../../actions/actions";
import { ParamTypes, PostCommentsProps, PostCommentsState, UserPostsItemsInterfaces } from "../../types/interfaces";
import DeleteIcon from '../../assets/images/delete-icon.svg'
import EditIcon from '../../assets/images/edit-icon.svg'
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { api } from "../../constants/api";

import '../../styles/styles.css'

const  SinglePost = ({ comments, posts, setCommentsList, editPostById, deletePostById }: PostCommentsProps )=> {
    const history = useHistory();
    const [ toggleModal, toggleModalSet ] = useState< boolean >(false )
    const [ isLoading, setIsLoading ] = useState< boolean >( true )
    const [ postInfo, setPostInfo ] = useState< UserPostsItemsInterfaces >( {} as UserPostsItemsInterfaces )
    let { id }  = useParams< ParamTypes >();

    useEffect(()=>{
        const loadComments = async () =>{
            try {
                const response = await axios.get(`${ api }comments?postId=${ id }`)
                const data = await response.data
                setCommentsList(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        loadComments()
        setIsLoading( false )
    },[ id, setCommentsList ])

    useEffect(()=>{
        const loadPost = () =>{
            const items = posts.find(( item )=>{
                return item.id === +id
            })
            if( items ){
                setPostInfo( items )
            }
            else {
                history.push('/')
            }
        }
        loadPost()
    },[ history, id, posts ])

    const updatePost = async ( title: string, body: string ) =>{
        try{
            const response = await axios.put(`${ api }posts/${ id }`,{
                id: postInfo.id,
                userId: postInfo.userId,
                title: title,
                body: body,
            })
            const updatedPost = await response.data
            editPostById( postInfo.id, updatedPost )
        }
        catch (e) {
            console.log(e)
        }
    }

    const deletePost = async () =>{
        try {
            const response = await axios.get(`${ api }posts/${id}`)
            if( response.status === 200){
                deletePostById( postInfo.id );
                history.goBack()
            }
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
            <span className='page-title'> Post </span>
            {
                isLoading ?
                    <LoadingCircle/>
                    :
                    <>
                    <div className='post-info'>
                        <span>id: { postInfo.id }</span>
                        <span>userId: { postInfo.userId }</span>
                        <span>title: { postInfo.title }</span>
                        <span>body: { postInfo.body }</span>
                    </div>
                    <div className='post-btn-container'>
                        <div className='post-btn' onClick={ handleModalChange }>
                            <img className='post-image' src={ EditIcon } alt='edit'/>
                            <span> edit </span>
                        </div>
                        <div className='post-btn' onClick={ deletePost }>
                            <img className='post-image' src={ DeleteIcon } alt='delete'/>
                            <span> delete </span>
                        </div>
                    </div>
                        <table className='page-table' >
                            <thead>
                                <tr>
                                    <th className='item-container'> Name </th>
                                    <th className='item-container'> Email </th>
                                    <th className='item-container'> Body </th>
                                </tr>
                            </thead>
                            <tbody className='page-table-body'>
                            {comments.map(({ id, name, email, body}) => {
                                return (<tr key={ id }>
                                    <td className='item-container'> { name } </td>
                                    <td className='item-container'> { email } </td>
                                    <td className='item-container'> { body } </td>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    </>
            }
            </div>
            { toggleModal &&
                <ModalWindow
                    title={ postInfo.title }
                    body={ postInfo.body }
                    id={ id }
                    handleModalClose={ handleModalChange }
                    submitForm = { updatePost }
                />
            }
    </div>
)
}

const mapDispatchToProps = ( dispatch: Dispatch ) => bindActionCreators({
    setCommentsList, editPostById, deletePostById
}, dispatch);
const mapStateToProps = (state: PostCommentsState) =>({
    posts: state.postsReducer.postsList,
    comments: state.commentsReducer.commentsList
})

export default connect( mapStateToProps, mapDispatchToProps )( SinglePost )