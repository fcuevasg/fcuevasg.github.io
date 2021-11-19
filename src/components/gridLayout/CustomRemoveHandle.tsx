import { CloseIcon } from '@abb/abb-common-ux-react'
import React from 'react'

const TopEastCross = (props: any) => (
  <div>
    <CloseIcon sizeClass='small' onClick={() => props.handleClick({ item: props.index, state: true })}></CloseIcon>
  </div >
)

const CustomHandle = (props: any) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '2px',
      border: '1px solid rgb(204, 204, 204)',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
    }}
    {...props}
  />
)

export const TopRightHandle = (props: any): React.ReactElement => {
  return (
    <CustomHandle >
      <TopEastCross index={props.index} handleClick={props.handleClick} />
    </CustomHandle>
  )
}