import React from 'react'
import { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalTitle, CModalHeader } from '@coreui/react'
import editIcon from '../../assets/images/editicon.png'
import trashIcon from '../../assets/images/trashicon.png'
import propTypes from 'prop-types'
import axios from '../../axios'

function TableAction(props) {
  const [visible, setVisible] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.patch(`/article/${props.id}`, {
        status: "Thrash"
      } )
      .then((res)=>{
        console.log(res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteOnClick = () => {
    handleDelete()
    setVisible(true)
  }

  return (
    <>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Success delete article!</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Your article has been moved to trash, check trash menu.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
    <a href={'/#/edit/' + props.id}>
      <img src={editIcon} alt="" style={{ width:"20px", cursor:"pointer" }}  />
    </a>
      <img src={trashIcon} alt="" style={{ width:"20px", marginLeft:"20px", cursor:"pointer" }} onClick={deleteOnClick} />
    </>
  )
}

TableAction.propTypes = {
  id: propTypes.number
}

export default TableAction
