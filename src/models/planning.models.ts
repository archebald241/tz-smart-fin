import { Dayjs } from "dayjs";

export interface IPlanningWatchForm {
    planed_date: Dayjs;
    comment?: string;
}

export interface IPlanningWatch {
    planed_date: string;
    comment?: string;
}

export interface IPlanningWatchStore {
    planningWatching?: Record<string, IPlanningWatch>;
    getPlanningWatch: () => Promise<void>;
    setPlanningWatching: (filmId: string, planningWatch: IPlanningWatch | undefined) => void;
    resetPlanningWatch: () => void;
}
