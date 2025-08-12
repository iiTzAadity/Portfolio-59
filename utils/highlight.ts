export function highlightProject(id: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent<string>("highlight-project", { detail: id }))
}
