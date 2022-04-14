import React from 'react'
import { ReactComponent as Chose1 } from '../../../assets/images/report/chose1.svg'
import { ReactComponent as Chose2 } from '../../../assets/images/report/chose2.svg'
import { ReactComponent as Chose3 } from '../../../assets/images/report/chose3.svg'
import { ReactComponent as Chose4 } from '../../../assets/images/report/chose4.svg'
import { ReactComponent as Incorrect } from '../../../assets/images/report/incorrect-answer.svg'

export const getIconChose = (chose) => {
  switch (chose) {
    case 0:
      return (
        <div style={{ width: '26px', height: '26px', backgroundColor: 'rgb(226, 27, 60)', borderRadius: '4px' }}>
          <Chose1 />
        </div>
      )
    case 1:
      return (
        <div style={{ width: '26px', height: '26px', backgroundColor: 'rgb(19, 104, 206)', borderRadius: '4px' }}>
          <Chose2 />
        </div>
      )

    case 2:
      return (
        <div style={{ width: '26px', height: '26px', backgroundColor: 'rgb(216, 158, 0)', borderRadius: '4px' }}>
          <Chose3 />
        </div>
      )
    case 3:
      return (
        <div style={{ width: '26px', height: '26px', backgroundColor: 'rgb(38, 137, 12)', borderRadius: '4px' }}>
          <Chose4 />
        </div>
      )
    case 4:
      return (
        <div style={{ width: '26px', height: '26px', borderRadius: '4px' }}>
          <Incorrect />
        </div>
      )
    default:
      return (
        <div
          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid rgb(204, 204, 204)' }}
        />
      )
  }
}
