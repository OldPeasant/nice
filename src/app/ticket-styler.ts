import { ParentTicket, ChildTicket } from './model';
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

    collapseAll(parentTickets: ParentTicket[]) {
        for (var ixT=0; ixT < parentTickets.length; ixT++) {
            console.log("Collapsing");
            const pt = parentTickets[ixT];
            pt.collapsed = true;
            pt.updateStyleClass();
        }
    }

    updateAllStyleClasses(viewSelection: ViewSelection, parentTickets: ParentTicket[]) {
        console.log("TicketStyler.updateAllStyleClasses");
        for (var ixT=0; ixT < parentTickets.length; ixT++) {
            const pt = parentTickets[ixT];
            console.log("  P " + pt.key + "(" + pt.children.length + ")");
            pt.updateStyleClass();
            for (var ixC=0; ixC < pt.children.length; ixC++) {
                var c = pt.children[ixC];
                c.updateStyleClass();
                console.log("     C " + c.key);
            }
            console.log("  Done children");
        }
        console.log("Done update all style classes");
    }
    updateModel(viewSelection: ViewSelection, parentTickets: ParentTicket[]) {
        console.log("TicketStyler.updateModel");
        console.log(viewSelection);
        console.log(parentTickets);
        if (viewSelection.selectedTeam == null) {
            // show tickets of all teams
            console.log("Showing all");
            for (var ixT=0; ixT < parentTickets.length; ixT++) {
                const pt = parentTickets[ixT];
                pt.parentDisplay = ParentDisplayValue.ParentTicketVisible;
		for (var c=0; c < pt.children.length; c++) {
			const ct = pt.children[c];
			ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketInTeam;
		}
            }
        } else {
            // show tickets related to viewSelection.selectedTeam
            for (var ixT=0; ixT < parentTickets.length; ixT++) {
                const pt = parentTickets[ixT];
                if (pt.relatedToTeam(viewSelection.selectedTeam)) {
                    console.log("Show " + pt.key);
                    pt.parentDisplay = ParentDisplayValue.ParentTicketVisible;
                } else {
                    console.log("Hide " + pt.key);
                    pt.parentDisplay = ParentDisplayValue.ParentTicketHidden;
                }
		for (var c=0; c < pt.children.length; c++) {
			const ct = pt.children[c];
			if (contains(ct.labels, viewSelection.selectedTeam)) {
				ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketInTeam;
			} else {
				ct.childTicketInTeam = ChildTicketInTeamValue.ChildTicketNotInTeam;
			}
		}
            }
        }
    }

    updateView(viewSelection: ViewSelection, parentTickets: ParentTicket[]) {
        console.log("TicketStyler.updateView");
        this.updateModel(viewSelection, parentTickets);
        this.updateAllStyleClasses(viewSelection, parentTickets);
    }

    updateHighlights(expandCollapse: boolean, viewSelection: ViewSelection, parentTickets: ParentTicket[]) {
        const selectedPerson = viewSelection.selectedPerson;
        if (selectedPerson == null) {
            for (const pt of parentTickets) {
                pt.highlight = false;
                for (const ct of pt.children) {
                    ct.highlight = false;
                }
                if (expandCollapse) {
                    pt.collapsed = true;
                }
            }
        } else {
            for (const pt of parentTickets) {
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
        this.updateAllStyleClasses(viewSelection, parentTickets);
    }

}
