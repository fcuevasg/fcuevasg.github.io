import React from 'react'
import { Story, Meta } from '@storybook/react'
import { GridLayoutResizable, LayoutProps } from './index'
import { Component, ComponentTypeEnum, Dashboard } from '@src/@types/Dashboard'
import { Layout } from 'react-grid-layout'
import { v4 } from 'uuid'

export default {
	component: GridLayoutResizable,
	title: 'Commponents/Common/GridLayout',
} as Meta

const TemplateGridLayout: Story<LayoutProps> = (args) => <GridLayoutResizable {...args} />

export const GridLayout = TemplateGridLayout.bind({})

const components: Component[] = [
	{
		id: '00',
		type: ComponentTypeEnum.iframe,
		iframeURL: 'https://giphy.com/embed/YRzCch08Pmg4zkwlAV',
		iframeName: 'Widget example SB1',
	},
	{
		id: '01',
		type: ComponentTypeEnum.iframe,
		iframeURL: 'https://giphy.com/embed/JmrkCxoxJm5OW3mv0Z',
		iframeName: 'Widget example SB2',
	},
	{
		id: '10',
		type: ComponentTypeEnum.iframe,
		iframeURL: 'https://giphy.com/embed/V4BcwvlWTINzFwdLQv',
		iframeName: 'Widget example SB3',
	},
	{
		id: '11',
		type: ComponentTypeEnum.iframe,
		iframeURL: 'https://giphy.com/embed/kGs6SCqqv85o4xva28',
		iframeName: 'Widget example SB4',
	},
]

const layout: Layout[] = [
	{
		h: 5,
		i: '00',
		moved: false,
		static: false,
		w: 3,
		x: 5,
		y: 5,
	},
	{
		h: 5,
		i: '01',
		moved: false,
		static: false,
		w: 3,
		x: 3,
		y: 0,
	},
	{
		h: 5,
		i: '10',
		moved: false,
		static: false,
		w: 3,
		x: 0,
		y: 0,
	},
	{
		h: 5,
		i: '11',
		moved: false,
		static: false,
		w: 3,
		x: 0,
		y: 5,
	},
]

GridLayout.args = {
	isEdit: false,
	components,
	isPreview: true,
	Layout: layout,
	tabId: v4(),
}
