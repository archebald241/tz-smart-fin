import { IPlanningWatch } from "../models/planning.models";
import axiosInstance from "./axios";

export const getPlanningWatchApi = (): Promise<Record<string, IPlanningWatch>> => {
    return axiosInstance.get<Record<string, IPlanningWatch>>(`/planning_watch`);
};

export const createPlanningWatchApi = (
    filmId: string,
    planningWatch: IPlanningWatch,
): Promise<void> => {
    return axiosInstance.post(`/planning_watch/${filmId}`, planningWatch);
};

export const deletePlanningWatchApi = (filmId: string): Promise<void> => {
    return axiosInstance.delete(`/planning_watch/${filmId}`);
};

export const updatePlanningWatchApi = (
    filmId: string,
    planningWatch: IPlanningWatch,
): Promise<void> => {
    return axiosInstance.put(`/planning_watch/${filmId}`, planningWatch);
};
