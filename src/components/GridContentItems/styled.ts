import styled from 'styled-components'

export const SWebViewer = styled.div`
	overflow: hidden;
	width: 100%;
	height: 100%;
	/* background-color: white; */
	& > .widget-content > iframe {
		width: 100%;
		height: 100%;
		border: none;
		z-index: ${(props) => props.value};
	}
	// & > span {
	// 	margin: 10px;
	// 	padding: 5px;
	// 	border-bottom: 3px solid black;
	// 	font-size: 1.2em;
	// 	width: 100%;
	// 	display: flex;
	// }
`

// onDragStart
// z-index: -1;

// onDragStop
// z-index: initial;
