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
            }
        }
    }
    updateModel(viewSelection: ViewSelection, epicStore : EpicStore) {
        if (viewSelection.selectedTeam == null) {
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
            // show tickets related to viewSelection.selectedTeam

            for (let epic of epicStore.allEpics) {
                for (let pt of epic.parentTickets) {
                    if (pt.relatedToTeam(viewSelection.selectedTeam)) {
                        pt.parentDisplay = ParentDisplayValue.ParentTicketVisible;
                    } else {
                        pt.parentDisplay = ParentDisplayValue.ParentTicketHidden;
                    }
                    for (let ct of pt.flatChildren) {
                        if (contains(ct.labels, viewSelection.selectedTeam)) {
                            ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketInTeam;
                        } else {
                            ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketNotInTeam;
                        }
                    }
                }
            }
        }
    }

    updateView(viewSelection: ViewSelection, epicStore: EpicStore) {
        this.updateModel(viewSelection, epicStore);
        this.updateAllStyleClasses(viewSelection, epicStore);
    }

    updateHighlights(expandCollapse: boolean, viewSelection: ViewSelection, epicStore: EpicStore) {
        const selectedPerson = viewSelection.selectedPerson;
        if (selectedPerson == null) {
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
                    pt.highlight = pt.hasWorkOf(selectedPerson);
                    for (const ct of pt.children) {
                        ct.highlight = ct.hasWorkOf(selectedPerson);
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
