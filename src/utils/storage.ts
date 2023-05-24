import { Conversion, Project } from './interfaces';

//function that takes an array of Conversions and converts them to a string
export function stringifyConversions(conversions: Conversion[]): string {
    return JSON.stringify(conversions);
}

//function that takes a string and converts it to an array of Conversions
export function parseConversions(conversions: string): Conversion[] {
    return JSON.parse(conversions);
}

export function saveConversionsToStorage(conversions: Conversion[]): void {
    localStorage.setItem('conversions', stringifyConversions(conversions));
}

export function getConversionsFromStorage(): Conversion[] {
    const conversions = localStorage.getItem('conversions');
    if (!conversions) {
        console.log("No conversions found in local storage")
        return [];
    } else {
      try {
        return parseConversions(conversions);
      } catch (error) {
        console.error("Could not parse saved conversions from local storage:", error)
        return [];
      }
    }
}

//function that stores array of Projects in local storage
export function saveProjectsToStorage(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
}

//function gets Projects from local storage
export function getProjectsFromStorage(): Project[] {
    const projects = localStorage.getItem('projects');
    if (!projects) {
        console.log("No projects found in local storage")
        //if no projects found, return an array with a default project
        return [{
            id: 0,
            name: "Project 1",
            conversions: []
        }];
    } else {
      try {
        return JSON.parse(projects);
      } catch (error) {
        console.error("Could not parse saved projects from local storage:", error)
        return [{
          id: 0,
          name: "Project 1",
          conversions: []
      }];
      }
    }
}