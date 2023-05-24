import { test, expect } from 'vitest';
import { 
  stringifyConversions, 
  parseConversions,
  saveConversionsToStorage,
  getConversionsFromStorage,
  saveProjectsToStorage,
  getProjectsFromStorage
} from '../utils/storage';
import { Conversion, Project } from '../utils/interfaces';

const testConversions: Conversion[] = [
  {
    pxValue: 16,
    remValue: 1
  },
  {
    pxValue: 32,
    remValue: 2
  },
  {
    pxValue: 8,
    remValue: 0.5
  }
]

const testProjects: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    conversions: testConversions
  },
  {
    id: 2,
    name: 'Project 2',
    conversions: testConversions
  },
  {
    id: 3,
    name: 'Project 3',
    conversions: testConversions
  }
];

const testString = '[{"pxValue":16,"remValue":1},{"pxValue":32,"remValue":2},{"pxValue":8,"remValue":0.5}]'

//test stringifyConversions
test('stringifyConversions', () => {
  expect(stringifyConversions(testConversions))
    .toBe(testString)
})

//test parseConversions
test('parseConversions', () => {
  expect(parseConversions(testString))
    .toEqual(testConversions)
})

//test saveConversions
test('saveConversions', () => {
  saveConversionsToStorage(testConversions)
  expect(localStorage.getItem('conversions'))
    .toBe(testString)
  localStorage.clear()
})

//test getConversions
test('getConversions', () => {
  localStorage.setItem('conversions', testString)
  expect(getConversionsFromStorage())
    .toEqual(testConversions)
  localStorage.clear()
})

test('getConversions with invalid data', () => {
  localStorage.setItem('conversions', 'invalid data')
  expect(getConversionsFromStorage())
    .toEqual([])
  localStorage.clear()
})

//test saveProjects
test('saveProjects', () => {
  saveProjectsToStorage(testProjects)
  expect(localStorage.getItem('projects'))
    .toBe(JSON.stringify(testProjects))
  localStorage.clear()
})

//test getProjects
test('getProjects', () => {
  localStorage.setItem('projects', JSON.stringify(testProjects))
  expect(getProjectsFromStorage())
    .toEqual(testProjects)
  localStorage.clear()
})