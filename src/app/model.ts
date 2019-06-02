import { AbstractTicket, Person, WorkLogEntry } from './common';
import { Status } from './conf';

import { ParentDisplayValue, ChildTicketInTeamValue, ViewSelection } from './view';
import { TicketStyler } from './ticket-styler';
import { SKILLS, NULL_LABEL } from './conf';
import { singleMatch } from './util';


export class Epic {
    name: string;
    parentTickets: ParentTicket[]  = [];

    constructor(name: string) {
        this.name = name;
    }

    addParentTicket(pt: ParentTicket) {
        this.parentTickets.push(pt);
    }
}

export class EpicStore {
    allEpics = [];
    getCreate(epicName: string) {
        for (let e of this.allEpics) {
            if (epicName == e.name) {
                return e;
            }
        }
        let epic = new Epic(epicName);
        this.allEpics.push(epic);
        return epic;
    }
}


export class ParentTicket extends AbstractTicket {
    epicName: string; 
    flatChildren = [];
    childTicketsBySkill = new Map();
    
    display:boolean = true;
    parentDisplay : ParentDisplayValue;
    styleClassString = "class-not-initialized";
    collapsed: boolean = true;

    constructor(epicName: string, key: string, subject: string, status:Status, labels:string[]) {
        super(key, subject, status);
        this.epicName = epicName;
    }
    getChildrenPerSkill(skill) {
        var cl = this.childTicketsBySkill.get(skill);
        return cl;
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
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.updateStyleClass();
    }

    relatedToTeam(team) {
        if (this.labels.includes(team)) {
            return true;
        }
        for (let ct of this.flatChildren) {    
            if (ct.labels.includes(team)) {
                return true;
            }
        }
        return false;
    }
}

export class ChildTicket extends AbstractTicket {
    childTicketInTeam : ChildTicketInTeamValue;
    styleClassString : string = "child-class-not-initialized";

    constructor(parentTicket: ParentTicket, key: string, subject: string, status: Status, labels:string[], workLog:WorkLogEntry[]) {
        super(key, subject, status);
        parentTicket.flatChildren.push(this);
        let match = singleMatch(SKILLS, labels);
        if (match == null) {
            match = NULL_LABEL;
        }
        let list = parentTicket.childTicketsBySkill.get(match);
        if (list == null) {
            list = [];
            parentTicket.childTicketsBySkill.set(match, list);
        }
        list.push(this);
        this.labels = labels;
        this.workLog = workLog;
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
    }
}

export class Model {
    viewSelection = new ViewSelection();
    ticketStyler = new TicketStyler();
    allPersons: Person[] = [];
    epicStore = new EpicStore();
    skills = SKILLS;

    addParentTicket(pt: ParentTicket) {
        let epic = this.epicStore.getCreate(pt.epicName);
        epic.addParentTicket(pt);
        this.ticketStyler.updateView(this.viewSelection, this.epicStore);
    }

    addPerson(p: Person) {
        this.allPersons.push(p);
    }

    selectTeam(team:string) {
        this.viewSelection.selectedTeam = team;
        this.ticketStyler.updateView(this.viewSelection, this.epicStore);
        this.ticketStyler.collapseAll(this.epicStore);
    }        

    selectPerson(pid:string) {
        if (!pid) {
            this.viewSelection.selectedPerson = null;
            this.ticketStyler.updateHighlights(true, this.viewSelection, this.epicStore);
            return;
        }
        for (const p of this.allPersons) {
            if (pid == p.pid || !pid) {
                this.viewSelection.selectedPerson = p;
                this.ticketStyler.updateHighlights(true, this.viewSelection, this.epicStore);
                return;
            }
        }
    }
}


