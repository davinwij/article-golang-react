import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardHeader, CCardSubtitle, CCardText, CRow, CPagination, CPaginationItem } from '@coreui/react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import './PreviewArticle.css'
import axios from '../../../../axios'

function PreviewArticle() {
  const [articles, setArticles] = useState([])
  const [draftArticles, setDraft] = useState([])
  const [page, setPage] = useState(0)

  const perPage = 3
  const pageVisited = page * perPage

  const displayArticle = draftArticles
        .slice(pageVisited, pageVisited + perPage)
        .map((item, index) => {
          return (
            <CRow className="mt-4" key={index}>
              <CCard>
              <CCardHeader>Article #{item.id}</CCardHeader>
              <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <CCardSubtitle>{item.category}</CCardSubtitle>
                <CCardText>{item.content}</CCardText>
              </CCardBody>
            </CCard>
            </CRow>
          )
  })

  const getArticles = async () => {
    try {
      await axios.get(`/articles/1000/0`)
        .then((res) => {
          setArticles(res.data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const pageCount = Math.ceil(draftArticles.length / perPage)

  const changePage = ({selected}) => {
    setPage(selected)
  }

  const checkArticleStatus = async () => {
    var draftArticle = await articles.filter((e) => {
      return e.status === "Publish"
    })
    setDraft(draftArticle)
  }

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    checkArticleStatus()
  }, [articles])


  return (
    <>
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationButton"}
      previousLinkClassName={"previousButton"}
      nextLinkClassName={"nextButton"}
      activeClassName={"activeButton"}
    />

    {displayArticle}
    </>
  )
}

export default PreviewArticle
