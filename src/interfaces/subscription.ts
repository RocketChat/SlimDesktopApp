export interface Subscription {
    id?: string;
    name?: any;
    unsubscribe: () => Promise<any>;
    onEvent: (callback: any) => void;
    [key: string]: any;
}
