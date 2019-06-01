import {
    ParentDisplayValue,
    ChildTicketInTeamValue,
    ViewSelection
} from './view';
import { TicketStyler } from './ticket-styler';

function contains(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

function containedExcl(relevantLabels:string[], toCheck:string, allLabels:string[]) {
    if (!contains(allLabels, toCheck)) {
        return false;
    }
    for (var ixRel = 0; ixRel < relevantLabels.length; ixRel++) {
        var rl = relevantLabels[ixRel];
        if (rl != toCheck && contains(allLabels, rl)) {
            return false;
        }
    }
    return true;
}

class MapOfList {
    map = {};

    add(key, value) {
        var list = this.map[key];
        if (list == null) {
            list = [];
            this.map[key] = list;
        }
        list.push(value);
    }
}
            
const NULL_LABEL = "??";

class LabelGrouper {


    ticketsByLabel = new MapOfList();

    constructor(labels: string[], tickets: CommonTicket[]) {
        for (var iT = 0; iT < tickets.length; iT++) {
            var t = tickets[iT];
            var hasExcl = false;
            for (var iL = 0; iL < t.labels.length; iL++) {
                var lbl = t.labels[iL];
                if (containedExcl(labels, lbl, t.labels)) {
                    this.ticketsByLabel.add(lbl, t);
                    hasExcl = true;
                    break;
                }
            }
            if (!hasExcl) {
                this.ticketsByLabel.add(NULL_LABEL, t);
            }
        }
    }
}

export class Person {
    pid:string;
    name:string;
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

export enum Status {
    ToDo,
    InProgress,
    Blocked,
    Done
}
//Status.ToDo.cssName = "status-todo";
//Status.InProgress.cssName = "status-in-progress";
//Status.Blocked.cssName = "status-blocked";
//Status.Done.cssName = "status-done";

export const CSS_PER_STATUS = {};
CSS_PER_STATUS[Status.ToDo] = "status-todo";
CSS_PER_STATUS[Status.InProgress] = "status-in-progress";
CSS_PER_STATUS[Status.Blocked] = "status-blocked";
CSS_PER_STATUS[Status.Done] = "status-done";

class CommonTicket {

    key = "No-Key";
    subject = "No Subject";
    status: Status;
    highlight = false;
    labels: string[] = [];
    workLog:WorkLogEntry[] = [];

    constructor(key: string, subject: string, status:Status) {
        this.key =  key;
        this.subject = subject;
        this.status = status;
        this.highlight = false;
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

    hasWorkOf(p:Person) {
        for (const w of this.workLog) {
            if (w.person == p) {
                return true;
            }
        }
        return false;
    }

}

export class ParentTicket extends CommonTicket {
    
    children = [];
    display:boolean = true;
    parentDisplay : ParentDisplayValue;
    styleClassString = "class-not-initialized";
    collapsed: boolean = true;

    constructor(key: string, subject: string, status:Status) {
        super(key, subject, status);
    }

    updateStyleClass() {
        if (this.parentDisplay == ParentDisplayValue.ParentTicketVisible) {
            this.styleClassString = "parent-ticket-visible";
        } else {
            this.styleClassString = "parent-ticket-hidden";
        }
        if (this.collapsed) {
            this.styleClassString += " collapsed";
        } else {
            this.styleClassString += " expanded";
        }
        this.styleClassString += " " + super.getStatusCss() + " " + super.getHighlightCss();
        console.log("Update styleClassString of " + this.key + " to " + this.styleClassString);
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.updateStyleClass();
        console.log("TOGGLE!");
    }

    relatedToTeam(team) {
        if (contains(this.labels, team)) {
            return true;
        }
        for (var i = 0; i < this.children.length; i++) {
            if (contains(this.children[i].labels, team)) {
                return true;
            }
        }
        return false;
    }
}

export class ChildTicket extends CommonTicket {
    childTicketInTeam : ChildTicketInTeamValue;
    styleClassString : string = "child-class-not-initialized";

    constructor(parentTicket: ParentTicket, key: string, subject: string, status: Status) {
        super(key, subject, status);
        parentTicket.children.push(this);
    }

    updateStyleClass() {
        var s = "";
        if (this.childTicketInTeam == ChildTicketInTeamValue.ChildTicketInTeam) {
            s += " child-in-team";
        } else if (this.childTicketInTeam == ChildTicketInTeamValue.ChildTicketNotInTeam) {
            s += " child-not-in-team";
        } else {
            s += " error";
        }
        s += " " + super.getStatusCss();
        s += " " + super.getHighlightCss();
        this.styleClassString = s;
	console.log("USC " + this.key + " " + this.styleClassString);
    }
}

export class Model {
    parentTickets: ParentTicket[] = [];
    viewSelection = new ViewSelection();
    ticketStyler = new TicketStyler();
    allPersons: Person[] = [];
    allEpics: string[] = [];

    addAll(newParentTickets: ParentTicket[]) {
        for (const pt of newParentTickets) {
            this.parentTickets.push(pt);
        }
        this.ticketStyler.updateView(this.viewSelection, this.parentTickets);
    }

    addPerson(p: Person) {
        console.log("Add person " + p.pid + " aka " + p.name + " to model");
        this.allPersons.push(p);
    }

    selectTeam(team:string) {
        this.viewSelection.selectedTeam = team;
        this.ticketStyler.updateView(this.viewSelection, this.parentTickets);
        this.ticketStyler.collapseAll(this.parentTickets);
    }        

    selectPerson(pid:string) {
        if (!pid) {
            this.viewSelection.selectedPerson = null;
            this.ticketStyler.updateHighlights(true, this.viewSelection, this.parentTickets);
            return;
        }
        for (const p of this.allPersons) {
            if (pid == p.pid || !pid) {
                console.log("Found " + p.name + " for PID " + pid);
                this.viewSelection.selectedPerson = p;
                this.ticketStyler.updateHighlights(true, this.viewSelection, this.parentTickets);
                return;
            }
        }
        console.log("No person found for " + pid);
    }
}
