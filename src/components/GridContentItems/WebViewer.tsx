import React, { useCallback, useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import ErrorWidget from '../ErrorWidget'

import { SWebViewer } from './styled'

// LIBS
import { Component, ComponentTypeEnum } from '@src/@types/Dashboard'
import * as plugins from '@src/plugins'

export interface NProps {
	component: Component | undefined
	zIndex: string
	onLoad?: () => void
	componentAspectRatio: "square" | "landscape" | "portrait"
	theme?: string
}
interface IProps extends NProps {
	setError: React.Dispatch<React.SetStateAction<boolean>>
	setErrorMessage?: React.Dispatch<React.SetStateAction<string>>
}
const GetComponent = (props: IProps): React.ReactElement => {
	const { onLoad, component, setError, setErrorMessage, componentAspectRatio, theme } = props
	const componentFunction = component?.componentName && plugins.default[component?.componentName]
	const CHideLoading = useCallback(() => {
		onLoad && onLoad()
	}, [onLoad])
	try {
		return (
			<>
				{component?.type === ComponentTypeEnum.iframe ? (
					<Iframe
						url={`${component?.iframeURL}`}
						position='relative'
						onLoad={CHideLoading}
						allow='fullscreen'
					/>
				) : (
					componentFunction({ setError, setErrorMessage, componentAspectRatio,theme })
				)}
			</>
		)
	} catch (err) {
		setError(true)
		return <div></div>
	}
}

export const WebViewer = (props: NProps): React.ReactElement => {
	const url = props.component?.type
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(
		`${url?.slice(7, url.length)} widget failed to load.`
	)
	const classes = props.componentAspectRatio+ " widget-content"
	return (
		<SWebViewer value={props.zIndex} className={" widget-container"}>
			{error && <ErrorWidget widgetName={url?.slice(7, url.length) || ''} message={errorMessage} />}
			<div className='widget-header'>
				<span>{`${props.component?.iframeName || ''}`}</span>
			</div>
			<div className={classes}>
				<GetComponent {...{ ...props, setError, setErrorMessage }} />
			</div>
		</SWebViewer>
	)
}
