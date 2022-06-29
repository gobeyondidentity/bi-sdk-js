
export type Void = () => void;
export type Data<T> = T | (() => T);
export type AsyncVoid = () => Promise<void>;
export type AsyncData<T> = T | (() => Promise<T>);

export function get<T>(x: Data<T>): T {
    if (x instanceof Function) {
        return x();
    }
    else {
        return x;
    }
}

export function resolve<T>(x: AsyncData<T>): Promise<T> {
    if (x instanceof Function) {
        return Promise.resolve(x());
    }
    else {
        return Promise.resolve(x);
    }
}

