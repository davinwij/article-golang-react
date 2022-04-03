import React from 'react'
import NavTabs from './NavTabs'
import { useState, useEffect } from 'react'
import { CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody } from '@coreui/react'
import axios from '../../../axios'
import TableAction from '../TableAction'

function Thrash() {
  const [articles, setArticles] = useState([])
  const [draftArticles, setDraft] = useState([])

  const getArticles = async () => {
    try {
      await axios.get('/articles/1000/0')
        .then((res) => {
          setArticles(res.data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const checkArticleStatus = async () => {
    var draftArticle = await articles.filter((e) => {
      return e.status === "Thrash"
    })
    setDraft(draftArticle)
    localStorage.setItem("trashLength", draftArticle.length)
  }


  useEffect(() => {
    getArticles()
    return () => {
      setDraft([])
    }
  }, [])

  useEffect(() => {
    getArticles()
    checkArticleStatus()
  }, [articles])

  return (
    <>
    <CRow>
      <NavTabs thrashLength={draftArticles.length} />
    </CRow>
    <CRow>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Category</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {draftArticles.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.title} <span style={{ color: "orange"}}>(deleted)</span></CTableDataCell>
                <CTableDataCell>{item.category}</CTableDataCell>
                <CTableDataCell>
                  <TableAction id={item.id} />
                </CTableDataCell>
              </CTableRow>
            ))}

          </CTableBody>
        </CTable>
      </CRow>
    </>
  )
}

export default Thrash
