export function getThemeFromLocalStorage(): string {
  return localStorage.getItem("scrumtools-theme") || "dark";
}
