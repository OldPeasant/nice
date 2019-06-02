import { Status, CSS_PER_STATUS } from './conf';

export class Person {
    pid: string;
    name: string;
    constructor(pid:string, name:string){
        this.pid = pid;
        this.name = name;
    }    
}

export class WorkLogEntry {
    person: Person;
    logTime: Date;

    constructor(person:Person, logTime:Date) {
        this.person = person;
        this.logTime = logTime;
    }
}

export class AbstractTicket {

    key = "No-Key";
    subject = "No Subject";
    status: Status;
    highlight = false;
    public labels: string[] = [];
    workLog:WorkLogEntry[] = [];

    constructor(key: string, subject: string, status:Status) {
        this.key =  key;
        this.subject = subject;
        this.status = status;
    }

    getStatusCss() {
        return CSS_PER_STATUS[this.status];
    }

    getHighlightCss() {
        if (this.highlight) {
            return "highlight-yes";
        } else {
            return "highlight-no";
        }
    }

    public hasWorkOf(p:Person) {
        for (let w of this.workLog) {
            if (w.person == p) {
                return true;
            }
        }
        return false;
    }

}

