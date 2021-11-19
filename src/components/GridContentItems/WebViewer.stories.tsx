import React from 'react'
import { Story, Meta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'
import { WebViewer, NProps } from './index'
import { Component, ComponentTypeEnum } from '@src/@types/Dashboard'

export default {
	component: WebViewer,
	title: 'Commponents/Common/WebViewer',
} as Meta

const TemplateWebViewer: Story<NProps> = (args) => <WebViewer {...args} />

export const GridContent = TemplateWebViewer.bind({})

const component: Component = {
	id: '1234ale567',
	type: ComponentTypeEnum.iframe,
	iframeURL: 'https://giphy.com/embed/YRzCch08Pmg4zkwlAV',
	iframeName: 'Widget example SB',
}

GridContent.args = {
	component,
	zIndex: '1',
}
