import { AUTOMATED_JOBS_EXTRA_DATA } from "../constants/consts";

export const doesJobNeedDatePeriodInputs = (job) => {

    for (const j of AUTOMATED_JOBS_EXTRA_DATA) {
        if (j.jobSignature == job.command_signature) {
            if (j.doesJobNeedDatePeriodInputs) {
                return true;
            }
        }
    }

    return false;
};