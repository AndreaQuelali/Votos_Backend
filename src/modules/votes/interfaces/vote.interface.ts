export interface IVote {
    id: number;
    name: string;
    date: string | Date;
    count: number;
    finished: boolean;
}

export interface IVoteFilter {
    name?: string;
    startAt?: Date;
    endAt?: Date;
    status?: boolean;
}