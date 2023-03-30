import React, { useEffect, useState } from "react"
import { User, Team } from "../../components/interfaces/Interfaces"
import axios from "axios"
import { getThemeFromLocalStorage } from "../../utils/index"
import "./SelectTeam.scss"

interface Props {

}

const SelectTeam: React.FC<Props> = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  // This useEffect gets the teams from the backend when the components renders for the first time 
  useEffect(() => {
    axios.get("http://localhost:8000/api/team/all", {}).then(res => {
      let { data, status } = res
      if (status === 200 && data) {
        setTeams(data)
      }

    })
  }, [])

  useEffect(() => {
    console.log('teams: ', teams)
  }, [teams])

  return (
    <div className="teams-screen">
      <h2>Selecciona tu equipo</h2>
      <div className="teams-list">
        {teams.map((team, index) => (
          <button className="teams-list-item" key={index}>
            {team.name}
          </button>
        ))}
      </div>
    </div>
  )

}

export default SelectTeam
