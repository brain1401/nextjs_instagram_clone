import { format, register } from "timeago.js";

const localFunc = (number: number, index: number): [string, string] => {
  return [
    ["방금", "곧"],
    ["%s초 전", "%s초 후"],
    ["1분 전", "1분 후"],
    ["%s분 전", "%s분 후"],
    ["1시간 전", "1시간 후"],
    ["%s시간 전", "%s시간 후"],
    ["1일 전", "1일 후"],
    ["%s일 전", "%s일 후"],
    ["1주일 전", "1주일 후"],
    ["%s주일 전", "%s주일 후"],
    ["1개월 전", "1개월 후"],
    ["%s개월 전", "%s개월 후"],
    ["1년 전", "1년 후"],
    ["%s년 전", "%s년 후"],
  ][index] as [string, string];
}

register('ko', localFunc);

export function parseDate(date?: string) {
  
  return date && format(date,"ko")
}