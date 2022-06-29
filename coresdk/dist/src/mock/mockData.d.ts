export declare type Void = () => void;
export declare type Data<T> = T | (() => T);
export declare type AsyncVoid = () => Promise<void>;
export declare type AsyncData<T> = T | (() => Promise<T>);
export declare function get<T>(x: Data<T>): T;
export declare function resolve<T>(x: AsyncData<T>): Promise<T>;
