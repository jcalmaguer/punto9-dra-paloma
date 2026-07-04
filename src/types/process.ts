export interface ProcessStep{
    "number": number
    "title": string
    "description": string
}

export interface ProcessData {
    "eyebrow": string
    "title": string
    "italicTitle": string
    "ProcessSteps": ProcessStep[]
}
