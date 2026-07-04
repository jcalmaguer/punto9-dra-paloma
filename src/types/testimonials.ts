export interface TestimonialTitle {
    italic: string 
    normal: string
}

export interface TestimonialItem {
    initials: string
    name: string
    condition: string
    details: string    
    quote: string    
    rating: number
}

export interface TestimonialData {
    eyebrow: string
    title: TestimonialTitle
    testimonials: TestimonialItem[]
}