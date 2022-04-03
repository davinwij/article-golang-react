import React from 'react'
import { useState, useEffect } from 'react'
import { CForm, CFormLabel, CFormInput, CFormTextarea, CButton, CModal, CModalBody, CModalFooter, CModalTitle, CModalHeader } from '@coreui/react'
import axios from '../../../../axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditArticle() {
  const{ id } = useParams()

  const [visible, setVisible] = useState(false)

  const [articles, setArticles] = useState({
    title: "",
    content: "",
    category: "",
    status: ""
  })

  const navigate = useNavigate()

  const getArticles = async () => {
    try {
      await axios.get(`/article/${id}`)
        .then((res) => {
          setArticles(res.data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const updateArticle  = async (status) => {
    try {
      axios.patch(`/article/${id}`, {
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

    updateArticle(status)
    setVisible(true)

    navigate('/publish')
  }

  const onDraft = () => {
    const status = "Draft"

    updateArticle(status)
    setVisible(true)

    navigate('/draft')
  }

  useEffect(() => {
    getArticles()
  }, [])


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
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
    <CForm>
    {articles.status == "Draft" && <div style={{ color: "red", marginBottom: "20px" }}> (draft) </div>}
    {articles.status == "Publish" && <div style={{ color: "green", marginBottom: "20px" }}> (published) </div>}
    {articles.status == "Thrash" && <div style={{ color: "orange", marginBottom: "20px" }}> (trashed) </div>}

      <div className="mb-3">
        <CFormLabel htmlFor="title">Title</CFormLabel>
        <CFormInput type="text" id="title" name="title" value={articles.title} onChange={handleOnChange}/>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="content">Content</CFormLabel>
        <CFormTextarea id="content" rows="3" name="content" value={articles.content} onChange={handleOnChange}></CFormTextarea>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="category">Category</CFormLabel>
        <CFormInput type="text" id="category" name="category" value={articles.category} onChange={handleOnChange}/>
      </div>
      <div className='mt-5 d-flex justify-content-between' style={{ width:"15%" }}>
        <CButton color="success" variant="outline" onClick={onPublish}>Publish</CButton>
        <CButton color="danger" variant="outline" onClick={onDraft}>Draft</CButton>
      </div>
    </CForm>
    </>
  )
}

export default EditArticle
