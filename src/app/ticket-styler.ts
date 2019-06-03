import { ParentTicket, ChildTicket, EpicStore } from './model';
import { ParentDisplayValue, ChildTicketInTeamValue, ViewSelection } from './view';

function contains(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

export class TicketStyler {

    collapseAll(epicStore: EpicStore) {
        for (let epic of epicStore.allEpics) {
            for (let pt of epic.parentTickets) {
                pt.collapsed = true;
                pt.updateStyleClass();
            }
        }
    }

    updateAllStyleClasses(viewSelection: ViewSelection, epicStore : EpicStore) {
        for (let epic of epicStore.allEpics) {
            for (let pt of epic.parentTickets) {
                pt.updateStyleClass();
                for (let ct of pt.flatChildren) {
                    ct.updateStyleClass();
                }
            }
        }
    }
    updateModel(viewSelection: ViewSelection, epicStore : EpicStore) {
        console.log("ticket-styler.updateModel");
        if (viewSelection.selectedTeam == null) {
            console.log("    No team selected, all parents visible, all children belong to team")
            // show tickets of all teams
            for (let epic of epicStore.allEpics) {
                for (let pt of epic.parentTickets) {
                    pt.parentDisplay = ParentDisplayValue.ParentTicketVisible;
                    for (let ct of pt.flatChildren) {
                        ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketInTeam;
                    }
                }
            }
        } else {
            console.log("    Team " + viewSelection.selectedTeam + " selected")
            // show tickets related to viewSelection.selectedTeam

            for (let epic of epicStore.allEpics) {
                for (let pt of epic.parentTickets) {
                    console.log("        Parent ticket " + pt.key);
                    if (pt.relatedToTeam(viewSelection.selectedTeam)) {
                        console.log("            is related to team");
                        pt.parentDisplay = ParentDisplayValue.ParentTicketVisible;
                    } else {
                        console.log("            is not related to team");
                        pt.parentDisplay = ParentDisplayValue.ParentTicketHidden;
                    }
                    for (let ct of pt.flatChildren) {
                        console.log("            Child Ticket " + ct.key);
                        if (contains(ct.labels, viewSelection.selectedTeam)) {
                            console.log("                belongs to team");
                            ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketInTeam;
                        } else {
                            console.log("                belongs not to team");
                            ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketNotInTeam;
                        }
                    }
                }
            }
        }
        console.log("ticket-styler.updateModel complete");
    }

    updateView(viewSelection: ViewSelection, epicStore: EpicStore) {
        this.updateModel(viewSelection, epicStore);
        this.updateAllStyleClasses(viewSelection, epicStore);
    }

    updateHighlights(expandCollapse: boolean, viewSelection: ViewSelection, epicStore: EpicStore) {
        const selectedPerson = viewSelection.selectedPerson;
        console.log("Update Highlights for " + selectedPerson.name);
        if (selectedPerson == null) {
            console.log("No person, unhighlight all, collapse all");
            for (let epic of epicStore.allEpics) {
                for (const pt of epic.parentTickets) {
                    pt.highlight = false;
                    for (const ct of pt.children) {
                        ct.highlight = false;
                    }
                    if (expandCollapse) {
                        pt.collapsed = true;
                    }
                }
            }
        } else {
            for (let epic of epicStore.allEpics) {
                for (const pt of epic.parentTickets) {
                    console.log("   " + pt.key);
                    pt.highlight = pt.hasWorkOf(selectedPerson);
                    console.log("      " + pt.highlight);
                    for (let ct of pt.flatChildren) {
                        ct.highlight = ct.hasWorkOf(selectedPerson);
                        console.log("         " + ct.key + " " + ct.hightlight);
                        if (ct.highlight) {
                            pt.highlight = true;
                        }
                    }
                    if (expandCollapse) {
                        pt.collapsed = !pt.highlight;
                    }
                }
            }
        }
        this.updateAllStyleClasses(viewSelection, epicStore);
    }

}
