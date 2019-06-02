import { NULL_LABEL } from './conf';
import { AbstractTicket } from './common';

export function singleMatch(interesting: string[], all: string[]) {
    let match = null;
    for (let i of interesting) {
        if (all.includes(i)) {
            if (match == null) {
                match = i;
            } else {
                return null;
            }
        }
    }
    return match;
}

export class MapOfLists {
    map = new Map();

    get(key) {
        let l = this.map[key];
        if (l == null) {
            l = [];
            this.map.set(key, l);
        }
        return l;
    }

    add(key, value) {
        this.get(key).push(value);
    }
}

export class LabelGrouper {

    ticketsByLabel = new MapOfLists();

    constructor(labels: string[], tickets: AbstractTicket[]) {
        for (let t of tickets) {
            let match = singleMatch(labels, t.labels);
            if (match == null) {
                match = NULL_LABEL;
            }
            this.ticketsByLabel.add(match, t);
        }
    }
}

