import React, { createRef, useState, useEffect, useLayoutEffect } from 'react'

/**
 * Returns the size of the component window in real time.
 *
 * @export
 * @return {*}  {number[]}
 */
export const useContainerDimensions = (myRef: React.RefObject<any>): Record<any, any> => {
  const [size, setSize] = useState([0, 0])

  useEffect(() => {
    if (myRef.current) {
        const { current } = myRef
        const boundingRect = current.getBoundingClientRect()
        const { width, height } = boundingRect
        setSize([Math.round(width), Math.round(height)])
    }
  }, [myRef]) // --> FRAN, this is the line which throws conflicts

  return size
}

/**
 * Returns the size of the browser window in real time.
 *
 * @export
 * @return {*}  {number[]}
 */
export function useWindowSize(): number[] {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize);
    updateSize()
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  return size
}

/**
 * Component created JUST TO TEST the useWindowSize()functionality.
 * 
 * @export
 */
export const TestWindowSize = (): React.ReactElement => {
    const [width, height] = useWindowSize()

    return (
        <div>
            <span>Window size: {width} x {height}</span>
        </div>
    )
}

/**
 * Component created JUST TO TEST the useContainerDimensions()functionality.
 * 
 * @export
 */
 export const TestContainerDimensions = (): React.ReactElement => {
  const divRef = createRef()
  const dimensions = useContainerDimensions(divRef)

  return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <div
          ref={divRef as React.RefObject<any>}
          style={{
            margin: '50px',
            width: '70%',
            height: '70%',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Dimensions: {dimensions.width}w {dimensions.height}h
        </div>
      </div>
  )
}