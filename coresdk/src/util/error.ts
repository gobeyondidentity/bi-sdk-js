
export function makeError(err: any) {
    if (typeof err === "string") return new Error(err)
    else if ("message" in err) return <Error>err;
    else return new Error(err);
}
