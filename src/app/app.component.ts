import { Component, OnInit } from '@angular/core';
import { ParentTicket, ChildTicket, Model, Person } from './model';
import { MockData } from './mock';
import { ViewSelection } from './view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

//export class AppComponent {
//  title = 'nice';
//}

export class AppComponent implements OnInit {
    title = 'nice';

    model = new Model();
    constructor() { }

    ngOnInit() {
        const md = new MockData();
        this.model.addAll(md.parentTickets);
        for (var i=0; i < md.persons.length; i++) {
            const p:Person = md.persons[i];

            console.log("here we go");
            console.log(this.model);
            console.log(this.model.addPerson);
            this.model.addPerson(p);


        }
    }

    selectedTeamCss(team) {
        const SELECTED_STYLE = "this-team-selected";
        const NOT_SELECTED_STYLE = "this-team-not-selected";
        console.log("Selected team CSS for " + team);
        if (team == null) {
            console.log("team null");
            if (this.model.viewSelection.selectedTeam == null) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        } else {
            console.log("team not null");
            console.log(this.model.viewSelection.selectedTeam);
            console.log(team);
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
        console.log("Selected person CSS for " + person);
        if (person == null) {
            console.log("person null");
            if (this.model.viewSelection.selectedPerson == null) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        } else {
            console.log("person not null");
            console.log(this.model.viewSelection.selectedPerson);
            console.log(person);
            if (this.model.viewSelection.selectedPerson == person) {
                return SELECTED_STYLE;
            } else {
                return NOT_SELECTED_STYLE;
            }
        }
    }
    selectTeam(team:string) {
            console.log("Selected team " + team);
            this.model.selectTeam(team);
    }

    selectPerson(pid:string) {
            console.log("Selected person " + pid);
            this.model.selectPerson(pid);
    }

}

