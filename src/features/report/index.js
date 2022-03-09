import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ReportDetailPlayers from './pages/ReportDetailPlayers'
import ReportDetailQuestion from './pages/ReportDetailQuestion'

import Report from './pages/Report'
import ReportDetail from './pages/ReportDetail'

const ReportFeature = (props) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Report {...props} />} />
        <Route path='detail/:id/' element={<Navigate to='players' />} />
        <Route path='detail/:id/players' element={<ReportDetailPlayers {...props} />} />
        <Route path='detail/:id/questions' element={<ReportDetailQuestion {...props} />} />
      </Routes>
      {/*<Routes>*/}
      {/*	*/}
      {/*</Routes>*/}
    </>
  )
}

export default ReportFeature
