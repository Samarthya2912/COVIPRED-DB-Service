function infectionProbabilityComparator(a, b) {
    if (a.infection_probability < b.infection_probability) {
        return 1;
    }
    if (a.infection_probability > b.infection_probability) {
        return -1;
    }
    return 0;
}

function timeStampComparator(a, b) {
    if (Number(a.beginsAt) < Number(b.beginsAt)) {
        return -1;
    }
    if (Number(a.beginsAt) > Number(b.beginsAt)) {
        return 1;
    }
    return 0;
}

exports.infectionProbabilityComparator = infectionProbabilityComparator;
exports.timeStampComparator = timeStampComparator;