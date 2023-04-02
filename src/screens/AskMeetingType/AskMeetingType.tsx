import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Team } from "../../components/interfaces/Interfaces"
import { MeetingType } from "../../components/interfaces/Interfaces"

type RouteParams = {
  team_id?: string
}

const AskMeetingType: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { team_id } = useParams<RouteParams>()
  const [team, setTeam] = useState<Team>()

  useEffect(() => {
    if (team_id) {
      axios.get(`http://localhost:8000/api/team/${team_id}`)
        .then(({ data: _team }) => {
          if (_team) {
            setTeam(_team)
          } else {
            navigate("/teams")
          }
        }
        ).catch(err => {
          navigate("/teams")
        })
    } else {
      navigate("/teams")
    }
  }, [])

  const selectType = (type: MeetingType) => {
    // create a new meeting with this date and navigate to it
    console.log(`creating a new ${type} meeting...`)
  }

  return <div className="select-meeting-type">
    {team &&
      <>
        <div>
          team: {team.name}
        </div>
        <div>
          <h2>Selecciona el tipo de meeting</h2>
          <button onClick={() => selectType("DAILY")}>DAILY</button>
          <button onClick={() => selectType("RETRO")}>RETRO</button>
        </div>
      </>
    }
  </div>
}

export default AskMeetingType
