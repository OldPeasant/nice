import { ParentTicket, ChildTicket, Person, Status, WorkLogEntry } from './model';

export class MockData {
    
    parentTickets = [];
    persons: Person[] = [];
 
  constructor() {

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

            ["PoC of SprintStats", Status.InProgress, [], [
                ["Setup basic components in angular app", Status.Done,
                    ["RE", "TeamA", "SprintReady"],
                    [ [date_1, p3], [date_2, p3], [date_2, p3] ]
                ], 
                ["Create mock Jira service", Status.ToDo,
                    ["SE", "TeamA"],
                    [  ]
                ] 
            ]],
            ["Actual Jira service call with transformation", Status.ToDo, [], [
                ["JSON call to Jira REST API", Status.ToDo,
                    ["SE", "TeamA"],
                    [ ]
                ], 
                ["Mapping Jira JSON format to my model", Status.ToDo,
                    ["SE", "TeamA"],
                    [ ]
                ], 
                ["Check permission for angular API calls to Jira API", Status.ToDo,
                    ["RE", "TeamA"],
                    [  ]
                ] 
            ]],
            ["Present SprintStats", Status.ToDo, [], [
                ["Prepare presentation", Status.ToDo,
                    ["RE", "TeamA"],
                    [ ]
                ], 
                ["Meeting room reservation", Status.ToDo,
                    ["RE", "TeamA"],
                    [ ]
                ] 
            ]]

/* ,
            ["", Status., [], [
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
            ["", Status., [], [
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
            ["", Status., [], [
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
            ["", Status., [], [
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
            ["", Status., [], [
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
            ["", Status., [], [
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
            ["", Status., [], [
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
            const subject: string = ptData[0];
            const parentTicket = new ParentTicket("Story-" + storyCount++, subject, ptData[1]);
            for (let label of ptData[2]) {
                parentTicket.labels.push(label);
            }
            for (let ctData of ptData[3]) {
                const childTicket = new ChildTicket(parentTicket, "Task-" + taskCount++, ctData[0], ctData[1]);
                for (let label of ctData[2]) {
                    childTicket.labels.push(label);
                }
                for (let work of ctData[3]) {
                    childTicket.workLog.push(new WorkLogEntry(work[1], work[0]));
                }
            }
            this.parentTickets.push(parentTicket);
        }
    }

}
