export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly effectiveDate: Date) {
    }

    isExpired (today: Date = new Date()) {
        if (!this.effectiveDate) return false;
        return this.effectiveDate.getTime() < today.getTime();
    }
}
