import { ParentTicket, ChildTicket } from './model';
import { Person, WorkLogEntry } from './common';
import { Status } from './conf';

export class MockData {
    
    parentTickets = [];
    persons: Person[] = [];
 
  constructor() {

        const EPIC_1 = "Build Software";
        const EPIC_2 = "Train And GoLive";

        const date_3 = new Date()
        const date_2 = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const date_1 = new Date(new Date().getTime() - (24 * 60 * 60 * 1000) * 2);

        const p1 = new Person("PID-01", "Roger Evergreen");
        this.persons.push(p1);
        const p2 = new Person("PID-02", "John Atkinson");
        this.persons.push(p2);
        const p3 = new Person("PID-03", "Nigel Goodman");
        this.persons.push(p3);
        const p4 = new Person("PID-04", "Thomas Eams");
        this.persons.push(p4);
       
        const ticketData:any[] = [

            [EPIC_1, "PoC of SprintStats", Status.InProgress, [], [
                ["Setup basic components in angular app", Status.Done,
                    ["RE", "TeamA", "SprintReady"],
                    [ [date_1, p3], [date_2, p3], [date_2, p3] ]
                ], 
                ["Create mock Jira service", Status.ToDo,
                    ["NG", "TeamA"],
                    [  ]
                ] 
            ]],
            [EPIC_1, "Actual Jira service call with transformation", Status.ToDo, [], [
                ["JSON call to Jira REST API", Status.ToDo,
                    ["NG", "TeamA"],
                    [ ]
                ], 
                ["Mapping Jira JSON format to my model", Status.ToDo,
                    ["NG", "TeamA"],
                    [ ]
                ], 
                ["Check permission for angular API calls to Jira API", Status.ToDo,
                    ["RE", "TeamA"],
                    [  ]
                ] 
            ]],
            [EPIC_2, "Present SprintStats", Status.ToDo, [], [
                ["Prepare presentation", Status.ToDo,
                    ["RE", "TeamA"],
                    [ ]
                ], 
                ["Meeting room reservation", Status.ToDo,
                    ["RE", "TeamA"],
                    [ ]
                ] 
            ]],
            [EPIC_2, "Training Nice script", Status.ToDo, [], [
                ["Handover docs", Status.ToDo,
                    ["NG", "TeamA"],
                    [ ]
                ], 
                ["Send training material", Status.InProgress,
                    ["RE", "TeamB"],
                    [ ]
                ], 
                ["Meeting invites", Status.ToDo,
                    ["TeamB"],
                    [  ]
                ] 
            ]]
/*   ,
            [EPIC_, "", Status., [], [
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ] 
            ]],
            [Epic_, "", Status., [], [
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ], 
                ["", Status.,
                    ["", "", "", "", "", "", ""],
                    [ [date_, p], [date_, p], [date_, p], [date_, p], [date_, p] ]
                ] 
            ]]
*/
        ];
        let storyCount = 1;
        let taskCount = 1;
        for (let ptData of ticketData) {
            const epicName: string = ptData[0];
            const subject: string = ptData[1];
            const parentTicket = new ParentTicket(epicName, "Story-" + storyCount++, subject, ptData[2], ptData[3]);
            for (let ctData of ptData[4]) {
                const childTicket = new ChildTicket(parentTicket, "Task-" + taskCount++, ctData[0], ctData[1], ctData[2], ctData[3]);
            }
            this.parentTickets.push(parentTicket);
        }
    }

}
