import React, { useEffect, useState, useRef } from 'react';
import {ModalWindowProps} from "../../types/interfaces";

import '../../styles/modal-window-styles.css'

const ModalWindow = ({ id, title, body, handleModalClose, submitForm }: ModalWindowProps) =>{
    const node = useRef< HTMLDivElement >( null );
    const [ titleText, setTitleText ] = useState< string >( '' )
    const [ bodyText, setBodyText] = useState< string >( '' )

    useEffect(()=>{
        if( id ){
            setTitleText( title )
            setBodyText( body )
        }
    },[ id, body, title ])

    const setTextByField = ( fieldName: string ) => ( e: React.ChangeEvent<HTMLInputElement> ) =>{
        fieldName === 'title' ? setTitleText( e.target.value ) : setBodyText( e.target.value )
    }

    const handleFormSubmit = ( e: React.FormEvent ) =>{
        e.preventDefault()
        submitForm( titleText, bodyText )
        handleModalClose()
    }

    useEffect(() => {
        const outOfModalClick = ( e: MouseEvent ) => {
            if (!node.current?.contains( e.target as Node )) {
                handleModalClose()
            }
        };
        document.addEventListener("mousedown", outOfModalClick, false);
        return () => {
            document.removeEventListener("mousedown", outOfModalClick, false);
        };
    }, [node, handleModalClose]);

    return(
        <div className="modal" >
            <div className="modal-content" ref={ node }>
                <div  className='modal-close-btn' onClick={ handleModalClose }>
                    close
                </div>
                <form className='modal-form' onSubmit={ handleFormSubmit }>
                    <div className='input-content'>
                        <input
                            type='text'
                            placeholder='title text'
                            className='input-element form-input'
                            value={ titleText }
                            onChange={ setTextByField('title' )}
                        />
                        <label htmlFor="name" className="form-label"> Title text </label>
                    </div>
                    <div className='input-content'>
                        <input
                            type='text'
                            placeholder='body text'
                            className='input-element form-input'
                            value={ bodyText }
                            onChange={ setTextByField('body') }
                        />
                        <label htmlFor="name" className="form-label"> Body text </label>
                    </div>
                    <button type='submit' className='submit-btn' disabled={ titleText.length < 3 || bodyText.length < 3 }>
                        submit
                    </button>
                </form>
            </div>
        </div>
    )
}
export default ModalWindow