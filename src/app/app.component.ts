import { Component, OnInit } from '@angular/core';
import { SKILLS } from './conf';
import { ParentTicket, ChildTicket, Model } from './model';
import { Person } from './common';
import { MockData } from './mock';
import { ViewSelection } from './view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
    title = 'nice';

    model = new Model();
    knownSkills = SKILLS;
    constructor() { }

    ngOnInit() {
        const md = new MockData();
        for (let pt of md.parentTickets) {
            this.model.addParentTicket(pt)
        }
        for (let p of md.persons) {
            this.model.addPerson(p);
        }
        console.log("================ M O D E L ================");
        console.log(this.model);
        console.log("================ M O D E L ================");
    }

    selectedTeamCss(team) {
        const SELECTED_STYLE = "this-team-selected";
        const NOT_SELECTED_STYLE = "this-team-not-selected";
        if (team == null) {
            if (this.model.viewSelection.selectedTeam == null) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        } else {
            if (this.model.viewSelection.selectedTeam == team) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        }
    }

    selectedPersonCss(person) {
        const SELECTED_STYLE = "this-person-selected";
        const NOT_SELECTED_STYLE = "this-person-not-selected";
        if (person == null) {
            if (this.model.viewSelection.selectedPerson == null) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        } else {
            if (this.model.viewSelection.selectedPerson == person) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        }
    }
    selectTeam(team:string) {
            this.model.selectTeam(team);
    }

    selectPerson(pid:string) {
            this.model.selectPerson(pid);
    }

}

