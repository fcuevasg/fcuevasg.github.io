import React, { useState, useEffect } from 'react'
import './App.scss'
import { Timer } from './components/timer'
import { TeamList } from './components/teamList'
import { PrimeDirective } from './components/primeDirective/primeDirective'
import { GridLayoutResizable } from './components/gridLayout'
import themeIcon from './assets/theme-icon.svg'
import { TeamMember } from './components/interfaces/Interfaces'
import { getFormattedDate } from './Helpers'

function App() {
	const [speakingIndex, setSpeakingIndex] = useState(+getSpeakingFromLocalStorage())
	const [members, setMembers] = useState<TeamMember[]>(getMembersFromLocalStorage())
	const [isEditMode, setIsEditMode] = useState(false)
	const [theme, setTheme] = useState(getThemeFromLocalStorage())

	const pd = ` Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand. `
	const [newMember, setnewMember] = useState('')
	const today = parseInt(getFormattedDate(new Date()))

	useEffect(() => {
		localStorage.setItem('scrumtools-theme', theme)
	}, [theme])

	useEffect(() => {
		localStorage.setItem('scrumtools-speaking', speakingIndex.toString())
	}, [speakingIndex])

	useEffect(() => {
		const newMembers = getMembersFromLocalStorage()
		setMembers(newMembers)
	}, [isEditMode])

	const addMember = () => {
		if (newMember === '@pandora') {
			setMembers([...members, ...generatePandoraMembers()])
			return
		}

		if (newMember !== '') {
			const newMemberData: TeamMember = {
				name: newMember,
				dailyData: {
					[today]: { time: 0, status: 0, emotionalStatus: 0 },
				},
			}

			localStorage.setItem('scrumtools-members', JSON.stringify([...members, newMemberData]))

			setMembers([...members, newMemberData])
		}
	}

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
	}

	const handleKeyPress = (event: any) => {
		if (event.code === 'NumpadEnter' || event.code === 'Enter') addMember()
	}

	return (
		<div className={'App ' + theme}>
			<div className='themeSwitcher' onClick={toggleTheme}>
				<img src={themeIcon} alt='Change theme' />
			</div>
			<Timer index={speakingIndex} setIndex={setSpeakingIndex} members={members} setMembers={setMembers} />
			<div className='daily-script'>
				<ul className='daily-script__list'>
					<li className='daily-script__list_item'>What I did last day</li>
					<li className='daily-script__list_item'>What I am going to do today</li>
					<li className='daily-script__list_item'>I have (not) blockers</li>
					<li className='daily-script__list_item'>I think AC &amp; SP for my task are (not) OK</li>
				</ul>
			</div>
			<div className='memberList'>
				<h3 className='members-title'>Members</h3>
				<button className='editButton' onClick={() => setIsEditMode(!isEditMode)}>
					{' '}
					{!isEditMode ? 'Edit' : 'Save'}
				</button>
				{!isEditMode ? (
					<TeamList members={members} setMembers={setMembers} speakingIndex={speakingIndex} setSpeakingIndex={setSpeakingIndex}></TeamList>
				) : (
          
					<div>
						{/* <div className="generate-members">
              <button
                className="generate-members__button"
                onClick={generatePandoraMembers}
              >
                Generate Pandora members
              </button>
            </div> */}
						<li className='listItem inputMember'>
							<div className='form-field__control'>
								<input className='form-field__input' type={'text'} value={newMember} onChange={(event) => setnewMember(event.target.value)} placeholder="New member's name" onKeyDown={handleKeyPress} />
							</div>
							<button className='addMember' onClick={addMember}>
								+
							</button>
						</li>
						<GridLayoutResizable TeamMembers={members} setMembers={setMembers} />
					</div>
				)}
			</div>
			<PrimeDirective content={pd} author='--Norm Kerth'></PrimeDirective>
		</div>
	)
}

export default App

function generatePandoraMembers() {
	const today = parseInt(getFormattedDate(new Date()))

	const pandoraMembers: TeamMember[] = [
		{
			name: 'Diego',
			dailyData: {},
		},
		{
			name: 'Ale',
			dailyData: {},
		},

		{
			name: 'Fran',
			dailyData: {},
		},
		{
			name: 'Javi',
			dailyData: {},
		},
		{
			name: 'Eric',
			dailyData: {},
		},
		{
			name: 'Ruben',
			dailyData: {},
		},
		{
			name: 'Jaime',
			dailyData: {},
		},
		{
			name: 'Sergio',
			dailyData: {},
		},
		{
			name: 'Jesús',
			dailyData: {},
		},
		{
			name: 'Davide',
			dailyData: {},
		},
	]
	localStorage.setItem('scrumtools-members', JSON.stringify(pandoraMembers))
	return pandoraMembers
}

function getMembersFromLocalStorage(): TeamMember[] {
	const localStorageMembers = localStorage.getItem('scrumtools-members')

	if (localStorageMembers && localStorageMembers?.length > 0) {
		return JSON.parse(localStorageMembers) as TeamMember[]
	}

	return []
}

function getThemeFromLocalStorage(): string {
	return localStorage.getItem('scrumtools-theme') || 'dark'
}

function getSpeakingFromLocalStorage(): string {
	return localStorage.getItem('scrumtools-speaking') || '0'
}
