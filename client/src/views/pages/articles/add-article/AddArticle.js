import React from 'react'
import { useState } from 'react'
import { CForm, CFormLabel, CFormInput, CFormTextarea, CButton, CModal, CModalBody, CModalFooter, CModalTitle, CModalHeader } from '@coreui/react'
import axios from '../../../../axios'
import { useNavigate } from 'react-router-dom'

function AddArticle() {

  const [visible, setVisible] = useState(false)

  const [articles, setArticles] = useState({
    title: "",
    content: "",
    category: "",
    status: ""
  })

  const navigate = useNavigate()

  const addArticle  = async (status) => {
    try {
      axios.post('/article', {
        title: articles.title,
        content: articles.content,
        category: articles.category,
        status: status
      })
        .then((res) => {
          if(res.data.success){
            console.log(res.data)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (e) => {
    setArticles({
      ...articles,
      [e.target.name]: e.target.value
    })
  }

  const onPublish = () => {
    const status = "Publish"

    addArticle(status)
    setVisible(true)
  }

  const onDraft = () => {
    const status = "Draft"

    addArticle(status)
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
    if(articles.status == "Draft"){
      navigate('/draft')
    }
    if(articles.status == "Publish"){
      navigate('/publish')
    }
  }

  return (
    <>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Success create article!</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Your article has been created, check Preview menu or All Post menu
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
    <CForm>
      <div className="mb-3">
        <CFormLabel htmlFor="title">Title</CFormLabel>
        <CFormInput type="text" id="title" name="title" onChange={handleOnChange}/>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="content">Content</CFormLabel>
        <CFormTextarea id="content" rows="3" name="content" onChange={handleOnChange}></CFormTextarea>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="category">Category</CFormLabel>
        <CFormInput type="text" id="category" name="category" onChange={handleOnChange}/>
      </div>
      <div className='mt-5 d-flex justify-content-between' style={{ width:"15%" }}>
        <CButton color="success" variant="outline" onClick={onPublish}>Publish</CButton>
        <CButton color="danger" variant="outline" onClick={onDraft}>Draft</CButton>
      </div>
    </CForm>
    </>
  )
}

export default AddArticle
