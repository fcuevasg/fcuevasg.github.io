# SCRUM Tools

Timer & member list to ease Daily Standup meetings.

## Steps to run

In the project directory, you can run:

1. `yarn` to build the project
2. `yarn start` to run the app in the development mode
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Local Storage

This project uses Local Storage to store data (for the moment). Below you'll find the most important ones:

## `scrumtools-members`

A JSON string to store all members data, can be overriden with a JSON that follow this structure:

        [
            {
                name: "Member 1",
                dailyData: {}
            },
            {
                name: "Member 2",
                dailyData: {}
            },
            ...
        ]

## `scrumtools-config`

A JSON string to store daily time params, can be overriden with a JSON that follow this structure:

        {
            "dailyStartHours": 9,
            "dailyStartMinutes": 30,
            "dailyDuration": 30
        }