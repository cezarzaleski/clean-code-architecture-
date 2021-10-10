export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly effectiveDate: Date) {
    }
}
