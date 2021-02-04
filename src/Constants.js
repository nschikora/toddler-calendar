const TODAY = new Date()
const MONTHS = new Array(12).fill(0).map((_, ix) => new Date(1970, ix, 15).toLocaleDateString([], { month: 'long' }))
const MIN_YEAR = TODAY.getFullYear() - 10
const MAX_YEAR = TODAY.getFullYear() + 10
const YEARS = new Array(MAX_YEAR - MIN_YEAR).fill(0).map((_, ix) => MIN_YEAR + ix)

export {
    TODAY,
    MONTHS,
    MIN_YEAR,
    MAX_YEAR,
    YEARS
}