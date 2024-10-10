import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IPlanningWatchStore } from "../models/planning.models";
import {
    getPlanningWatchApi,
    createPlanningWatchApi,
    deletePlanningWatchApi,
    updatePlanningWatchApi,
} from "../api/planning.api";

export const usePlanningWatchStore = create(
    persist<IPlanningWatchStore>(
        (set, get) => ({
            planningWatching: undefined,
            async getPlanningWatch() {
                if (get().planningWatching) {
                    return;
                }

                getPlanningWatchApi().then((planningWatch) => {
                    set({ planningWatching: planningWatch });
                });
            },
            setPlanningWatching(filmId, planningWatch) {
                const planningWatching = { ...get().planningWatching };

                if (planningWatch) {
                    if (planningWatching[filmId]) {
                        updatePlanningWatchApi(filmId, planningWatch);
                    } else {
                        createPlanningWatchApi(filmId, planningWatch);
                    }
                    planningWatching[filmId] = planningWatch;
                } else if (planningWatching[filmId]) {
                    delete planningWatching[filmId];
                    deletePlanningWatchApi(filmId);
                }

                set({ planningWatching });
            },
            resetPlanningWatch() {
                set({ planningWatching: undefined });
                get().getPlanningWatch();
            },
        }),
        {
            name: "planning-watch-storage",
        },
    ),
);
