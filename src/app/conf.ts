
export enum Status {
    ToDo,
    InProgress,
    Blocked,
    Done
}

export const NULL_LABEL:string = "??";

export const SKILLS: string[] = ["RE", "DB", "JV", "NG", "PY", "SH", NULL_LABEL];


export const CSS_PER_STATUS = {};
CSS_PER_STATUS[Status.ToDo] = "status-todo";
CSS_PER_STATUS[Status.InProgress] = "status-in-progress";
CSS_PER_STATUS[Status.Blocked] = "status-blocked";
CSS_PER_STATUS[Status.Done] = "status-done";
