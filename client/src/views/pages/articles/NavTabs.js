import React from 'react'
import { CNav, CNavItem, CNavLink } from '@coreui/react'
import propTypes from 'prop-types'

function NavTabs(props) {
  return (
    <>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href="/#/publish">Published ({localStorage.getItem("publishLength")})</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/#/draft">Draft ({localStorage.getItem("draftLength")})</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/#/thrash">Trashed ({localStorage.getItem("trashLength")})</CNavLink>
        </CNavItem>
      </CNav>
    </>
  )
}

NavTabs.propTypes = {
  draftLength: propTypes.number,
  thrashLength: propTypes.number,
  publishLength: propTypes.number
}

export default NavTabs
