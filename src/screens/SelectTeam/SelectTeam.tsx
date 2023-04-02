import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Team, MongoObjectId } from "../../components/interfaces/Interfaces"
import axios from "axios"
import { getThemeFromLocalStorage } from "../../utils/index"
import "./SelectTeam.scss"

interface Props {

}

const SelectTeam: React.FC<Props> = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  const navigate = useNavigate()

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

  const selectTeam = (team: MongoObjectId): void => {
    navigate(`/meeting_type/${team.$oid}`)
  }

  return (
    <div>
      <h2>Selecciona tu equipo</h2>
      <div>
        {teams.map((team, index) => (
          <button onClick={() => selectTeam(team._id as MongoObjectId)} className="teams-list-item" key={index}>
            {team.name}
          </button>
        ))}
      </div>
    </div>
  )

}

export default SelectTeam
