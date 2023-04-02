import { TeamMember } from "../components/interfaces/Interfaces"

export function getThemeFromLocalStorage(): string {
  return localStorage.getItem("scrumtools-theme") || "dark";
}

export function getMembersFromLocalStorage(): TeamMember[] {
  const localStorageMembers = localStorage.getItem("scrumtools-members");

  if (localStorageMembers && localStorageMembers?.length > 0) {
    return JSON.parse(localStorageMembers) as TeamMember[];
  }

  return [];
}


export function getSpeakingFromLocalStorage(): string {
  return localStorage.getItem("scrumtools-speaking") || "0";
}
